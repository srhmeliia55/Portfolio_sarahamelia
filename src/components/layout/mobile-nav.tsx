"use client";

import { motion } from "framer-motion";
import { GraduationCap, Home, Mail, Sparkles, User } from "lucide-react";
import { ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { useScrollToSection } from "@/lib/use-scroll-to";

/** Ikon per section — urutannya mengikuti `ui.nav`. */
const NAV_ICONS: Record<string, typeof Home> = {
  "#home": Home,
  "#about": User,
  "#skills": Sparkles,
  "#journey": GraduationCap,
  "#contact": Mail,
};

const NAV_IDS = ui.nav.map((item) => item.href.replace("#", ""));

/**
 * Navigasi bawah khusus layar kecil.
 * Di desktop navigasi sudah ada di navbar atas, jadi bar ini disembunyikan.
 */
export function MobileNav() {
  const { t } = useLocale();
  const scrollToSection = useScrollToSection();
  const active = useScrollSpy(NAV_IDS, NAV_IDS[0]);

  return (
    <nav
      aria-label={t({ id: "Navigasi utama", en: "Main navigation" })}
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="glass-strong mx-auto flex max-w-md items-stretch gap-1 rounded-2xl p-1.5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] dark:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
        {ui.nav.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          const Icon = NAV_ICONS[item.href] ?? Home;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToSection(item.href)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition-colors duration-300",
                isActive ? "text-ink" : "text-ink-4",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 rounded-xl border border-hairline bg-elevated-2"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}

              <Icon
                className={cn(
                  "relative z-10 size-[18px] transition-colors duration-300",
                  isActive ? "text-accent" : "text-ink-4",
                )}
              />
              <span className="relative z-10 w-full truncate text-center">{t(item.label)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
