"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const scrollToSection = useScrollToSection();
  const lenis = useLenis();
  const active = useScrollSpy(NAV_IDS, NAV_IDS[0]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kunci gulir halaman saat menu mobile terbuka.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
    return () => {
      lenis.start();
    };
  }, [lenis, menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Tunggu overlay menutup agar perhitungan posisi akurat.
    window.setTimeout(() => scrollToSection(href), menuOpen ? 260 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled ? "glass-strong shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)] dark:shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)]" : "border border-transparent",
          )}
        >
          {/* Monogram */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
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
                UI/UX Designer
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
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300",
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
                onClick={() => handleNavClick("#contact")}
                className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(192,38,211,0.9)] transition hover:brightness-110"
              >
                {t(ui.actions.getInTouch)}
                <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-9 place-items-center rounded-xl border border-hairline bg-elevated text-ink-2 transition hover:bg-elevated-2 lg:hidden"
              aria-label={t(ui.actions.menu)}
            >
              <Menu className="size-4.5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-canvas/90 backdrop-blur-xl" />

            <motion.div
              className="relative flex h-full flex-col px-6 pb-10 pt-6"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold tracking-tight text-ink">
                  {profile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-10 place-items-center rounded-xl border border-hairline bg-elevated-2 text-ink-2"
                  aria-label={t(ui.actions.close)}
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1.5">
                {ui.nav.map((item, index) => {
                  const id = item.href.replace("#", "");
                  const isActive = active === id;

                  return (
                    <motion.button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.05 + index * 0.05 }}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition",
                        isActive
                          ? "border-violet-400/30 bg-violet-500/10"
                          : "border-hairline bg-elevated hover:bg-elevated-2",
                      )}
                    >
                      <span className="font-display text-xl font-medium text-ink">{t(item.label)}</span>
                      <span className="font-mono text-[11px] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {LOCALES.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLocale(code)}
                      className={cn(
                        "flex-1 rounded-xl border px-4 py-3 font-mono text-xs font-semibold uppercase tracking-widest transition",
                        locale === code
                          ? "border-violet-400/40 bg-gradient-to-r from-violet-500/25 to-fuchsia-500/20 text-white"
                          : "border-hairline bg-elevated text-ink-3",
                      )}
                    >
                      {code === "id" ? "Indonesia" : "English"}
                    </button>
                  ))}
                  <ThemeToggle className="[&>button]:size-11 [&>button]:rounded-xl" />
                </div>

                <button
                  type="button"
                  onClick={() => handleNavClick("#contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-white"
                >
                  {t(ui.actions.getInTouch)}
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
