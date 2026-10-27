"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Gulir halus ke section (memakai Lenis bila tersedia).
 * Kalau section tujuan tidak ada di halaman ini (mis. tombol navigasi
 * diklik dari halaman proyek), arahkan ke section tersebut di beranda.
 */
export function useScrollToSection() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (href: string) => {
      const element = document.querySelector<HTMLElement>(href);

      if (!element) {
        if (pathname !== "/") router.push(`/${href}`);
        return;
      }

      if (lenis) {
        lenis.scrollTo(element, { offset: -76, duration: 1.25 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis, pathname, router],
  );
}
