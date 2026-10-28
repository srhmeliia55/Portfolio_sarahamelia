"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LOCALES, profile, ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { EASE_OUT } from "@/lib/motion";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { useScrollToSection } from "@/lib/use-scroll-to";

const NAV_IDS = ui.nav.map((item) => item.href.replace("#", ""));

/**
 * `activeId` dipakai di halaman selain beranda: item navigasi tidak perlu
 * terlihat aktif karena section-nya tidak ada di halaman tersebut.
 */
export function Navbar({ activeId }: { activeId?: string }) {
  const { t, locale, setLocale } = useLocale();
  const scrollToSection = useScrollToSection();
  const spyActive = useScrollSpy(NAV_IDS, NAV_IDS[0]);
  const active = activeId ?? spyActive;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
          scrolled
            ? "glass-strong shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)] dark:shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)]"
            : "border border-transparent",
        )}
      >
        {/* Monogram */}
        <button
          type="button"
          onClick={() => scrollToSection("#home")}
          className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1"
          aria-label={profile.name}
        >
          <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-[13px] font-bold text-white shadow-[0_6px_24px_-8px_rgba(167,139,250,0.9)]">
            {profile.initials}
            <span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/15" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[13.5px] font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              {t(profile.role)}
            </span>
          </span>
        </button>

        {/* Navigasi desktop */}
        <nav className="hidden items-center gap-0.5 rounded-full border border-hairline bg-elevated p-1 lg:flex">
          {ui.nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 xl:px-3.5",
                  isActive ? "text-ink" : "text-ink-3 hover:text-ink",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-hairline bg-elevated-2"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{t(item.label)}</span>
              </button>
            );
          })}
        </nav>

        {/* Aksi kanan */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-hairline bg-elevated p-0.5"
            role="group"
            aria-label={t(ui.actions.switchLang)}
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={cn(
                  "relative rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider transition-colors",
                  locale === code ? "text-white" : "text-ink-4 hover:text-ink-3",
                )}
              >
                {locale === code ? (
                  <motion.span
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/85 to-fuchsia-500/75"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{code}</span>
              </button>
            ))}
          </div>

          <ThemeToggle />

          <Magnetic strength={0.25} className="hidden sm:block">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(192,38,211,0.9)] transition hover:brightness-110"
            >
              {t(ui.actions.getInTouch)}
              <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
