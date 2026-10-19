"use client";

import { motion } from "framer-motion";
import { Frame, MousePointerClick, Palette } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading, SectionShell } from "@/components/ui/section";
import { skillGroups, techMarquee, ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { EASE_OUT } from "@/lib/motion";

const GROUP_ICONS = [Frame, MousePointerClick, Palette];

export function Skills() {
  const { t } = useLocale();

  return (
    <SectionShell id="skills">
      <Container>
        <SectionHeading
          eyebrow={t(ui.sections.skills.eyebrow)}
          title={t(ui.sections.skills.title)}
          subtitle={t(ui.sections.skills.subtitle)}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const Icon = GROUP_ICONS[groupIndex] ?? Frame;

            return (
              <Reveal key={group.title.id} y={30} delay={groupIndex * 0.08}>
                <article className="group/group h-full rounded-3xl border border-hairline bg-card p-6 backdrop-blur-sm transition-colors duration-500 hover:border-violet-400/25">
                  <header className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-1 ring-inset ring-white/15",
                        group.accent,
                      )}
                    >
                      <Icon className="size-4.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink">
                        {t(group.title)}
                      </h3>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-4">
                        {group.items.length} skills
                      </p>
                    </div>
                  </header>

                  <ul className="mt-6 flex flex-col gap-4">
                    {group.items.map((item, itemIndex) => (
                      <li key={item.name}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[13.5px] font-medium text-ink-2">{item.name}</span>
                          <span className="font-mono text-[11px] text-ink-4">{item.level}%</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-elevated-2">
                          <motion.div
                            className={cn("h-full rounded-full bg-gradient-to-r", group.accent)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{
                              duration: 1.1,
                              ease: EASE_OUT,
                              delay: 0.1 + itemIndex * 0.07,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Teks berjalan */}
        <Reveal y={18} className="mt-16">
          <p className="mb-5 text-center font-mono text-[10.5px] uppercase tracking-[0.28em] text-ink-4">
            {t(ui.sections.skills.coreLabel)}
          </p>
          <div className="flex flex-col gap-3">
            <Marquee speed={42}>
              <div className="flex items-center">
                {techMarquee.map((tech) => (
                  <span key={tech} className="flex items-center">
                    <span className="px-4 text-[13.5px] font-medium tracking-tight text-ink-3 transition-colors hover:text-ink">
                      {tech}
                    </span>
                    <span className="size-1 rounded-full bg-violet-400/40" />
                  </span>
                ))}
              </div>
            </Marquee>

            <Marquee speed={52} reverse>
              <div className="flex items-center">
                {[...techMarquee].reverse().map((tech) => (
                  <span key={`reverse-${tech}`} className="flex items-center">
                    <span className="px-4 text-[13.5px] font-medium tracking-tight text-ink-4 transition-colors hover:text-ink">
                      {tech}
                    </span>
                    <span className="size-1 rounded-full bg-cyan-400/40" />
                  </span>
                ))}
              </div>
            </Marquee>
          </div>
        </Reveal>
      </Container>
    </SectionShell>
  );
}
