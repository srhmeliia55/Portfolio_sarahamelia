"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Garis kemajuan gulir di bagian paling atas halaman. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
