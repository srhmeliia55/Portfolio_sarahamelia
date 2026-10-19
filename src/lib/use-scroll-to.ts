"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

/** Gulir halus ke section (memakai Lenis bila tersedia). */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (href: string) => {
      const element = document.querySelector<HTMLElement>(href);
      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element, { offset: -76, duration: 1.25 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis],
  );
}
