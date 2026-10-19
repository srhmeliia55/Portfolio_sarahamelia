"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroScene } from "@/components/canvas/hero-scene";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { AnimatedWords } from "@/components/ui/reveal";
import { socialIconMap } from "@/components/ui/social-icons";
import { profile, ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { EASE_OUT } from "@/lib/motion";
import { useTheme } from "@/lib/theme";
import { useScrollToSection } from "@/lib/use-scroll-to";

export function Hero() {
  const { t } = useLocale();
  const { theme } = useTheme();
  const scrollToSection = useScrollToSection();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % profile.roles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative isolate min-h-dvh overflow-hidden pt-28 sm:pt-32">
      {/* Kanvas Three.js */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 -z-10">
        <HeroScene className="size-full" theme={theme} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 pb-28 sm:px-8"
      >
        <div className="max-w-3xl">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 dark:border-emerald-400/20 dark:bg-emerald-400/[0.07]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70 dark:bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="text-[11.5px] font-medium tracking-wide text-emerald-700 dark:text-emerald-200/90">
              {t(profile.availability)}
            </span>
          </motion.div>

          {/* Sapaan */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
            className="mt-7 font-mono text-[12px] uppercase tracking-[0.32em] text-accent"
          >
            {t(profile.greeting)}
          </motion.p>

          {/* Nama */}
          <h1 className="mt-3 font-display text-[2.7rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.75rem]">
            <AnimatedWords
              text={profile.name}
              delay={0.28}
              stagger={0.11}
              className="text-gradient-soft"
            />
          </h1>

          {/* Peran berganti */}
          <div className="mt-5 flex h-8 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 22, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -22, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="text-gradient text-lg font-medium sm:text-xl"
              >
                {t(profile.roles[roleIndex])}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Ringkasan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-3 sm:text-[1.0625rem]"
          >
            {t(profile.headline)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-4"
          >
            {t(profile.tagline)}
          </motion.p>

          {/* Aksi */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.82 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.22}>
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(167,139,250,0.95)] transition-all duration-500 hover:bg-[position:100%_0]"
              >
                <Mail className="size-4" />
                {t(ui.actions.getInTouch)}
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href={profile.resumeUrl}
                className="glass flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink-2 transition hover:border-violet-400/30 hover:text-ink"
              >
                <Download className="size-4" />
                {t(ui.actions.downloadCv)}
              </a>
            </Magnetic>

            <span className="ml-1 hidden items-center gap-1.5 text-[13px] text-ink-4 sm:flex">
              <MapPin className="size-3.5" />
              {t(profile.location)}
            </span>
          </motion.div>

          {/* Statistik */}
          <motion.dl
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.95 }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label.id} className="flex flex-col gap-1">
                <dt className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dt>
                <dd className="text-[11.5px] uppercase tracking-[0.14em] text-ink-4">
                  {t(stat.label)}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Sosial media */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-11 flex items-center gap-2.5"
          >
            {profile.socials.map((social) => {
              const Icon = socialIconMap[social.icon];
              return (
                <Magnetic key={social.label} strength={0.35}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    title={`${social.label} — ${social.handle}`}
                    className={cn(
                      "grid size-10 place-items-center rounded-xl border border-hairline bg-elevated text-ink-3",
                      "transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-ink",
                    )}
                  >
                    <Icon className="size-[17px]" />
                  </a>
                </Magnetic>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Petunjuk gulir */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:flex"
        aria-label={t(ui.actions.scroll)}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-4">
          {t(ui.actions.scroll)}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-violet-400 to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="size-3.5 text-ink-4" />
      </motion.button>
    </section>
  );
}
