"use client";

import { useEffect, useState } from "react";

/**
 * Menentukan section yang sedang aktif berdasarkan posisi viewport.
 * Memakai satu IntersectionObserver dengan pita sempit di tengah layar.
 */
export function useScrollSpy(ids: string[], initial = ""): string {
  const [active, setActive] = useState(initial || ids[0] || "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
