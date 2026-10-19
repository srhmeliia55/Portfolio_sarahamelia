"use client";

import { motion } from "framer-motion";
import { GraduationCap, Layers, MapPin, Palette, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, SectionHeading, SectionShell } from "@/components/ui/section";
import { focusAreas, profile, ui, type L } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

const FOCUS_ICONS = {
  palette: Palette,
  layers: Layers,
  sparkles: Sparkles,
} as const;

const QUICK_FACTS = [
  {
    icon: GraduationCap,
    label: ui.sections.about.degreeLabel,
    value: { id: "Teknik Informatika", en: "Informatics Engineering" } as L,
  },
  {
    icon: Star,
    label: ui.sections.about.gpaLabel,
    value: { id: "3.84 / 4.00", en: "3.84 / 4.00" } as L,
  },
  {
    icon: Sparkles,
    label: ui.sections.about.semesterLabel,
    value: { id: "Semester 5", en: "Semester 5" } as L,
  },
  {
    icon: MapPin,
    label: { id: "Lokasi", en: "Location" } as L,
    value: profile.location,
  },
];

const PHOTO_TAGS: L[] = [
  { id: "Cilegon", en: "Cilegon" },
  { id: "Remote-friendly", en: "Remote-friendly" },
  { id: "Siap magang", en: "Open to internship" },
];

export function About() {
  const { t } = useLocale();

  return (
    <SectionShell id="about">
      <Container>
        <SectionHeading
          eyebrow={t(ui.sections.about.eyebrow)}
          title={t(ui.sections.about.title)}
          align="left"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Kolom foto */}
          <Reveal x={0} y={34} className="lg:sticky lg:top-28 lg:self-start">
            <div className="ring-gradient rounded-3xl bg-card p-px shadow-[0_40px_90px_-50px_rgba(76,29,149,0.75)]">
              <div className="overflow-hidden rounded-[calc(1.5rem-1px)] bg-card-2">
                {/* Foto */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={profile.photo.src}
                    alt={t(profile.photo.alt)}
                    fill
                    sizes="(max-width: 1024px) 92vw, 420px"
                    className="object-cover object-center"
                  />

                  {/* Overlay agar teks tetap terbaca di kedua tema */}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/25 to-transparent" />

                  {/* Label semester */}
                  <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-2">
                    <GraduationCap className="size-3.5 text-accent" />
                    {t({ id: "Semester 5", en: "Semester 5" } as L)}
                  </span>

                  {/* Nama & peran */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {profile.name}
                    </h3>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {t(profile.role)}
                    </p>
                  </div>
                </div>

                {/* Fakta singkat 2×2 */}
                <dl className="grid grid-cols-2 gap-px bg-hairline">
                  {QUICK_FACTS.map((fact) => (
                    <div key={fact.label.id} className="flex items-start gap-3 bg-card-2 p-4">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-hairline bg-elevated text-accent">
                        <fact.icon className="size-3.5" />
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-4">
                          {t(fact.label)}
                        </dt>
                        <dd className="mt-0.5 truncate text-[13px] font-medium text-ink-2">
                          {t(fact.value)}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {/* Tag */}
                <div className="flex flex-wrap gap-2 border-t border-hairline bg-card-2 p-4">
                  {PHOTO_TAGS.map((tag) => (
                    <span
                      key={tag.en}
                      className="rounded-full border border-hairline bg-elevated px-3 py-1 font-mono text-[10.5px] tracking-wide text-ink-3"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio + fokus */}
          <div className="flex flex-col gap-10">
            <Stagger className="flex flex-col gap-5" stagger={0.12}>
              {profile.bio.map((paragraph, index) => (
                <StaggerItem key={index}>
                  <p
                    className={
                      index === 0
                        ? "text-[1.0625rem] leading-relaxed text-ink-2"
                        : "text-[0.975rem] leading-relaxed text-ink-3"
                    }
                  >
                    {t(paragraph)}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <div>
              <Reveal y={20}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-4">
                  {t(ui.sections.about.focusTitle)}
                </h3>
              </Reveal>

              <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
                {focusAreas.map((area) => {
                  const Icon = FOCUS_ICONS[area.icon];
                  return (
                    <StaggerItem key={area.icon} className="h-full">
                      <Magnetic strength={0.12} className="block h-full">
                        <motion.article
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 24 }}
                          className="group h-full rounded-2xl border border-hairline bg-elevated p-5 transition-colors duration-300 hover:border-violet-400/30 hover:bg-violet-500/[0.06]"
                        >
                          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-accent ring-1 ring-inset ring-hairline transition group-hover:from-violet-500/40 group-hover:text-ink">
                            <Icon className="size-4.5" />
                          </span>
                          <h4 className="mt-4 font-display text-[15px] font-semibold tracking-tight text-ink">
                            {t(area.title)}
                          </h4>
                          <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                            {t(area.desc)}
                          </p>
                        </motion.article>
                      </Magnetic>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
