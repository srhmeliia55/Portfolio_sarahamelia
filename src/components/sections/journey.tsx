"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Backpack, BookOpen, GraduationCap, School } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading, SectionShell } from "@/components/ui/section";
import { timeline, ui, type TimelineKind } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { EASE_OUT } from "@/lib/motion";

/**
 * Gaya per jenjang. Kelas dasar = tema terang, `dark:` = tema gelap.
 * Ikon & warna berbeda tiap jenjang agar rel terasa hidup.
 */
const KIND_STYLES: Record<
  TimelineKind,
  { icon: typeof GraduationCap; ring: string; chip: string; glow: string }
> = {
  university: {
    icon: GraduationCap,
    ring: "from-violet-500/70 to-indigo-500/40",
    chip: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200",
    glow: "rgba(139,92,246,0.45)",
  },
  senior: {
    icon: School,
    ring: "from-cyan-400/70 to-sky-500/40",
    chip: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-200",
    glow: "rgba(34,211,238,0.45)",
  },
  junior: {
    icon: BookOpen,
    ring: "from-fuchsia-500/70 to-pink-500/40",
    chip: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200",
    glow: "rgba(232,121,249,0.45)",
  },
  elementary: {
    icon: Backpack,
    ring: "from-amber-400/70 to-orange-500/40",
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200",
    glow: "rgba(251,191,36,0.45)",
  },
};

export function Journey() {
  const { t } = useLocale();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 55%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <SectionShell id="journey">
      <Container>
        <SectionHeading
          eyebrow={t(ui.sections.journey.eyebrow)}
          title={t(ui.sections.journey.title)}
          subtitle={t(ui.sections.journey.subtitle)}
        />

        <ol ref={listRef} className="relative mt-14 flex flex-col gap-7 pl-0">
          {/* Rel vertikal */}
          <span aria-hidden="true" className="absolute left-[21px] top-3 bottom-3 w-px bg-hairline" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[21px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400"
            style={{ scaleY: railScale }}
          />

          {timeline.map((item, index) => {
            const style = KIND_STYLES[item.kind];
            const Icon = style.icon;

            return (
              <li key={`${item.title.id}-${index}`} className="relative pl-16">
                {/* Titik */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
                  className="absolute left-[13px] top-4 grid size-[18px] place-items-center rounded-full border border-hairline-2 bg-canvas-2"
                  style={{ boxShadow: `0 0 18px ${style.glow}` }}
                >
                  <span
                    className={cn("size-[9px] rounded-full bg-gradient-to-br", style.ring)}
                  />
                </motion.span>

                <Reveal y={28} delay={index * 0.04} amount={0.3}>
                  <article className="group rounded-2xl border border-hairline bg-card p-5 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/25 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-xl border bg-gradient-to-br from-elevated to-transparent",
                          style.chip,
                        )}
                      >
                        <Icon className="size-4" />
                      </span>

                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-widest",
                          style.chip,
                        )}
                      >
                        {t(item.period)}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-ink sm:text-lg">
                      {t(item.title)}
                    </h3>
                    <p className="mt-1 text-[12.5px] font-medium uppercase tracking-[0.12em] text-ink-4">
                      {t(item.org)}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-3">
                      {t(item.desc)}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </SectionShell>
  );
}
