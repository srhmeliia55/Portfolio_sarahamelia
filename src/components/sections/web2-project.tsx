"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import type { MouseEvent } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { OutputPreview } from "@/components/ui/output-preview";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, SectionHeading, SectionShell } from "@/components/ui/section";
import { web2Lessons, web2Page } from "@/data/web2";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useScrollToSection } from "@/lib/use-scroll-to";

const home = { id: "Beranda", en: "Home" } as const;

export function Web2Project() {
  const { t } = useLocale();
  const scrollToSection = useScrollToSection();

  const jumpTo = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <main className="relative">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden pb-6 pt-28 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[420px] w-[min(90vw,760px)] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[120px] dark:bg-violet-600/20" />
          <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[90px]" />
        </div>

        <Container>
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-4"
            >
              <Link href="/" className="transition-colors hover:text-accent">
                {t(home)}
              </Link>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => scrollToSection("#projects")}
                className="transition-colors hover:text-accent"
              >
                {t(web2Page.breadcrumb)}
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-ink-2">Web 2</span>
            </nav>

            <div className="mt-6">
              <Eyebrow>{t(web2Page.eyebrow)}</Eyebrow>
            </div>

            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              <span className="text-gradient-soft">{t(web2Page.title)}</span>
              <span className="mt-1 block text-gradient">{t(web2Page.titleAccent)}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-3 sm:text-[1.0625rem]">
              {t(web2Page.subtitle)}
            </p>

            <dl className="mt-9 grid gap-3 sm:grid-cols-3">
              {web2Page.facts.map((fact) => (
                <div
                  key={fact.label.id}
                  className="rounded-2xl border border-hairline bg-card px-4 py-3.5 backdrop-blur-sm"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                    {t(fact.label)}
                  </dt>
                  <dd className="mt-1.5 text-[13.5px] font-medium text-ink">{t(fact.value)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#echo"
                onClick={jumpTo("#echo")}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(192,38,211,0.9)] transition hover:brightness-110"
              >
                {t(web2Page.startCta)}
                <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/"
                className="group flex items-center gap-2 rounded-full border border-hairline bg-elevated px-5 py-2.5 text-[13px] font-medium text-ink-2 transition hover:border-violet-400/40 hover:text-ink"
              >
                <ChevronLeft className="size-4 transition group-hover:-translate-x-0.5" />
                {t(web2Page.backCta)}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Daftar materi + latihan                                          */}
      {/* ---------------------------------------------------------------- */}
      <SectionShell id="materi">
        <Container>
          <SectionHeading
            eyebrow={t(web2Page.tocEyebrow)}
            title={t(web2Page.tocTitle)}
            subtitle={t(web2Page.tocSubtitle)}
          />

          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {web2Lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <Reveal y={20} delay={index * 0.04} className="h-full">
                  <a
                    href={`#${lesson.id}`}
                    onClick={jumpTo(`#${lesson.id}`)}
                    className="group flex h-full items-start gap-3 rounded-2xl border border-hairline bg-card p-4 transition-colors duration-300 hover:border-violet-400/35 hover:bg-elevated"
                  >
                    <span className="mt-0.5 font-mono text-[11px] font-semibold text-accent">
                      {lesson.order}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-medium leading-snug text-ink-2 transition-colors group-hover:text-ink">
                        {t(lesson.title)}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 font-mono text-[10.5px] text-ink-4">
                        <span className="truncate">{lesson.file}</span>
                        <ChevronRight className="size-3.5 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-20 flex flex-col gap-20 sm:gap-24">
            {web2Lessons.map((lesson) => (
              <article key={lesson.id} id={lesson.id} className="scroll-mt-28">
                <Reveal>
                  <header className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl border border-hairline bg-elevated font-mono text-[11px] font-semibold text-accent">
                        {lesson.order}
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                          {t(lesson.title)}
                        </h2>
                        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-3">
                          {t(lesson.desc)}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 self-start rounded-full border border-hairline bg-elevated px-3 py-1 font-mono text-[10.5px] text-ink-4 sm:ml-4">
                      {lesson.file}
                    </span>
                  </header>
                </Reveal>

                <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
                  <Reveal y={22}>
                    <CodeBlock
                      code={lesson.code}
                      filename={lesson.file}
                      labels={{
                        code: t(web2Page.codeLabel),
                        copy: t(web2Page.copyLabel),
                        copied: t(web2Page.copiedLabel),
                      }}
                    />
                  </Reveal>

                  <Reveal y={22} delay={0.06}>
                    <OutputPreview
                      path={`localhost/web2/${lesson.file}`}
                      label={t(web2Page.outputLabel)}
                      lines={lesson.output}
                    />
                  </Reveal>
                </div>

                {lesson.tip ? (
                  <Reveal y={14} delay={0.04}>
                    <aside
                      className={cn(
                        "mt-4 flex items-start gap-3 rounded-2xl border border-hairline bg-card px-4 py-3.5",
                        "border-l-2 border-l-violet-400/60",
                      )}
                    >
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      <p className="text-[13px] leading-relaxed text-ink-3">
                        <span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
                          {t(web2Page.tipLabel)}
                        </span>
                        {t(lesson.tip)}
                      </p>
                    </aside>
                  </Reveal>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </SectionShell>

      {/* ---------------------------------------------------------------- */}
      {/* Cara menjalankan                                                 */}
      {/* ---------------------------------------------------------------- */}
      <SectionShell id="menjalankan" className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <div className="ring-gradient overflow-hidden rounded-3xl border border-hairline bg-card p-6 backdrop-blur-sm sm:p-9">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
                {t(web2Page.runEyebrow)}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {t(web2Page.runTitle)}
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-3">
                {t(web2Page.runSubtitle)}
              </p>

              <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                {web2Page.runSteps.map((step, index) => (
                  <li
                    key={step.title.id}
                    className="flex flex-col rounded-2xl border border-hairline bg-elevated p-4"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-mono text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 text-[13.5px] font-semibold text-ink">{t(step.title)}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-3">{t(step.desc)}</p>
                    {step.code ? (
                      <code className="mt-3 block overflow-x-auto rounded-lg border border-hairline bg-canvas-2 px-3 py-2 font-mono text-[10.5px] text-ink-2">
                        {step.code}
                      </code>
                    ) : null}
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-[12.5px] leading-relaxed text-ink-4">{t(web2Page.runNote)}</p>
            </div>
          </Reveal>
        </Container>
      </SectionShell>

      {/* ---------------------------------------------------------------- */}
      {/* Penutup                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative pb-10 pt-4">
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-hairline bg-card px-6 py-10 text-center backdrop-blur-sm">
              <h2 className="text-gradient-soft font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t(web2Page.outroTitle)}
              </h2>
              <p className="max-w-md text-[14px] leading-relaxed text-ink-3">
                {t(web2Page.outroDesc)}
              </p>
              <Link
                href="/"
                className="group mt-1 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(192,38,211,0.9)] transition hover:brightness-110"
              >
                <ChevronLeft className="size-4 transition group-hover:-translate-x-0.5" />
                {t(web2Page.backCta)}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
