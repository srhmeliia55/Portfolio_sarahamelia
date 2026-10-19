"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Jeda sebelum animasi mulai (detik). */
  delay?: number;
  /** Jarak geser vertikal awal (px). */
  y?: number;
  /** Jarak geser horizontal awal (px). */
  x?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  blur?: boolean;
};

/** Munculkan konten saat masuk viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  blur = false,
}: RevealProps) {
  const hidden = blur ? { opacity: 0, y, x, filter: "blur(12px)" } : { opacity: 0, y, x };
  const visible = blur ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wadah yang menganimasikan anak-anaknya secara berurutan. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Anak dari <Stagger>. */
export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Judul yang muncul huruf demi huruf. */
export function AnimatedWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + index * stagger }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
