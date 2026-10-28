"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Globe, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading, SectionShell } from "@/components/ui/section";
import { ui } from "@/data/portfolio";
import { featuredProject, otherProjects, type Project, type ProjectIcon } from "@/data/projects";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";

const ICONS: Record<ProjectIcon, typeof Code2> = {
  code: Code2,
  globe: Globe,
  sparkles: Sparkles,
};

/** Chip kecil berisi nama teknologi. */
function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-hairline bg-elevated px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
      {children}
    </span>
  );
}

/** Kartu kecil untuk proyek kedua dan seterusnya. */
function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();
  const Icon = ICONS[project.icon];
  const isSoon = project.status === "soon";

  const body = (
    <>
      <header className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-1 ring-inset ring-white/15",
            project.accent,
          )}
        >
          <Icon className="size-4.5" />
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-4">
          {isSoon ? t(ui.sections.projects.soonLabel) : project.year}
        </span>
      </header>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
        {project.title}
        <span className="mt-1 block text-[13px] font-normal text-ink-4">{t(project.subtitle)}</span>
      </h3>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-3">{t(project.desc)}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </>
  );

  if (isSoon) {
    return (
      <div className="h-full rounded-3xl border border-dashed border-hairline bg-card/60 p-6">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={project.href}
      className="group flex h-full flex-col rounded-3xl border border-hairline bg-card p-6 transition-colors duration-300 hover:border-violet-400/35 hover:bg-elevated"
    >
      {body}
      <span className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-accent">
        {t(ui.sections.projects.openCta)}
        <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function Projects() {
  const { t } = useLocale();
  const featured = featuredProject;

  if (!featured) return null;

  const FeaturedIcon = ICONS[featured.icon];
  const featuredClass =
    "group relative block overflow-hidden rounded-3xl border border-hairline bg-card transition-colors duration-500";
  const featuredHref = featured.status === "live" ? featured.href : null;

  const featuredBody = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet-500/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-100 dark:bg-violet-600/20"
      />

      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-1 ring-inset ring-white/15",
                featured.accent,
              )}
            >
              <FeaturedIcon className="size-5" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-4">
              {t(ui.sections.projects.featuredLabel)} · {featured.year}
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            {featured.title}
            <span className="mt-1 block text-gradient-soft text-lg font-normal sm:text-xl">
              {t(featured.subtitle)}
            </span>
          </h3>

          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-3">
            {t(featured.desc)}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {featured.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(192,38,211,0.9)] transition group-hover:brightness-110">
            {featuredHref ? t(ui.sections.projects.openCta) : t(ui.sections.projects.soonLabel)}
            <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-elevated/60 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
            {t(ui.sections.projects.highlightsLabel)}
          </p>
          <ol className="mt-4 flex flex-col gap-2.5">
            {featured.highlights.map((item, index) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-[11px] font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] leading-snug text-ink-2">{t(item)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );

  return (
    <SectionShell id="projects">
      <Container>
        <SectionHeading
          eyebrow={t(ui.sections.projects.eyebrow)}
          title={t(ui.sections.projects.title)}
          subtitle={t(ui.sections.projects.subtitle)}
        />

        {/* Kartu besar proyek unggulan */}
        <Reveal y={28} className="mt-14">
          {featuredHref ? (
            <Link href={featuredHref} className={cn(featuredClass, "hover:border-violet-400/35")}>
              {featuredBody}
            </Link>
          ) : (
            <div className={cn(featuredClass, "border-dashed")}>{featuredBody}</div>
          )}
        </Reveal>

        {/* Proyek lainnya */}
        {otherProjects.length > 0 ? (
          <div className="mt-12">
            <Reveal y={16}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-4">
                {t(ui.sections.projects.othersLabel)}
              </p>
            </Reveal>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <Reveal key={project.slug} y={24} delay={index * 0.06} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </SectionShell>
  );
}
