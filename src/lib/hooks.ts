"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/* Media query                                                         */
/* ------------------------------------------------------------------ */

/**
 * Membaca media query dengan `useSyncExternalStore` sehingga nilai awal
 * di server aman (selalu `false`) lalu diperbarui setelah hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/* ------------------------------------------------------------------ */
/* Nilai waktu                                                         */
/* ------------------------------------------------------------------ */

const noopSubscribe = () => () => {};
const getYearSnapshot = () => new Date().getFullYear();
const getYearServerSnapshot = () => null;

/** Tahun berjalan; `null` saat masih di server/prerender. */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(noopSubscribe, getYearSnapshot, getYearServerSnapshot);
}
