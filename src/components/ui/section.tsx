"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

/** Pembungkus section dengan jarak dan anchor yang konsisten. */
export function SectionShell({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

/** Batas lebar konten. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Label kecil bergaya pil. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-elevated px-3.5 py-1.5",
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-accent",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
      {children}
    </span>
  );
}

/** Judul section dengan animasi masuk. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>

      <motion.h2
        className={cn(
          "text-gradient-soft font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
          align === "center" && "max-w-3xl",
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
      >
        {title}
      </motion.h2>

      <motion.span
        className={cn(
          "block h-px w-24 bg-gradient-to-r from-violet-400/80 via-fuchsia-400/50 to-transparent",
          align === "center" && "mx-auto w-32",
        )}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
      />

      {subtitle ? (
        <motion.p
          className={cn("max-w-2xl text-base leading-relaxed text-ink-3 sm:text-[1.0625rem]", align === "center" && "mx-auto")}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
