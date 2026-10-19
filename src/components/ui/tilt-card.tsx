"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Kartu dengan efek 3D tilt + sorotan yang mengikuti kursor.
 * Transform ditangani MotionValue sehingga tidak memicu re-render React.
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 24, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 24, mass: 0.5 });

  const handleMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      rotateY.set((px - 0.5) * intensity * 2);
      rotateX.set((0.5 - py) * intensity * 2);

      if (spotlight) {
        node.style.setProperty("--spot-x", `${px * 100}%`);
        node.style.setProperty("--spot-y", `${py * 100}%`);
      }
    },
    [intensity, rotateX, rotateY, spotlight],
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative will-change-transform", spotlight && "spotlight-card", className)}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
