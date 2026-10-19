"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor='hover'], input, textarea, select, label";

/** Warna cincin disesuaikan agar tetap terlihat di kedua tema. */
const RING_COLORS = {
  dark: { hover: "rgba(232,121,249,0.85)", idle: "rgba(196,181,253,0.55)" },
  light: { hover: "rgba(192,38,211,0.75)", idle: "rgba(109,40,217,0.45)" },
} as const;

/**
 * Kursor kustom: titik presisi + cincin yang mengikuti dengan pegas.
 * Otomatis nonaktif pada perangkat sentuh dan saat pengguna meminta
 * pengurangan animasi.
 */
export function Cursor() {
  const { theme } = useTheme();
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 32, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 300, damping: 32, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHovering(
        Boolean(target && typeof target.closest === "function" && target.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 54 : 30;
  const ringColors = RING_COLORS[theme];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      {/* Titik presisi */}
      <motion.div className="absolute" style={{ x, y }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.span
            className="block rounded-full bg-ink"
            animate={{ width: pressed ? 8 : 6, height: pressed ? 8 : 6, opacity: hovering ? 0 : 1 }}
            transition={{ duration: 0.18 }}
          />
        </div>
      </motion.div>

      {/* Cincin pengikut */}
      <motion.div className="absolute" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hovering ? 1 : 0.55,
            borderColor: hovering ? ringColors.hover : ringColors.idle,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
}
