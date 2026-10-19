"use client";

import { Moon, Sun } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useTheme } from "@/lib/theme";

/**
 * Tombol ganti tema terang/gelap.
 *
 * Pergantian ikon dilakukan murni lewat CSS (`.theme-icon-light` /
 * `.theme-icon-dark` di globals.css) sehingga tidak ada perbedaan antara
 * HTML dari server dan hasil hidrasi.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();
  const { t } = useLocale();
  const label = t(ui.actions.switchTheme);

  return (
    <Magnetic strength={0.3} className={cn("shrink-0", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="relative grid size-9 place-items-center rounded-full border border-hairline bg-elevated text-ink-3 transition-colors duration-300 hover:border-violet-400/40 hover:text-ink"
      >
        <Sun className="theme-icon-light size-4" />
        <Moon className="theme-icon-dark size-4" />
      </button>
    </Magnetic>
  );
}
