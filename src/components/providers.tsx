"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Cursor } from "@/components/ui/cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { LocaleProvider } from "@/lib/locale";
import { ThemeProvider } from "@/lib/theme";

/**
 * Kumpulan provider sisi klien:
 *   - ThemeProvider   → tema terang/gelap (disinkronkan dengan skrip inline di <head>)
 *   - LocaleProvider  → bahasa ID/EN
 *   - ReactLenis      → gulir halus (dinonaktifkan bila pengguna memilih reduce motion)
 *   - Backdrop        → latar aurora/grid/noise
 *   - ScrollProgress  → indikator kemajuan gulir
 *   - Cursor          → kursor kustom (desktop saja)
 */
export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ThemeProvider>
      <LocaleProvider>
        <Backdrop />
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.1,
            smoothWheel: !reducedMotion,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
            syncTouch: false,
            autoRaf: true,
          }}
        >
          <ScrollProgress />
          <Cursor />
          {children}
        </ReactLenis>
      </LocaleProvider>
    </ThemeProvider>
  );
}
