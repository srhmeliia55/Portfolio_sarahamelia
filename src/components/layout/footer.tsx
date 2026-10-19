"use client";

import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { socialIconMap } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/section";
import { profile, ui } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";
import { useCurrentYear } from "@/lib/hooks";
import { useScrollToSection } from "@/lib/use-scroll-to";

export function Footer() {
  const { t } = useLocale();
  const scrollToSection = useScrollToSection();
  const year = useCurrentYear();

  return (
    <footer className="relative mt-10 border-t border-hairline pb-10 pt-14">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 font-display text-sm font-bold text-white">
                {profile.initials}
              </span>
              <div>
                <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
                  {profile.name}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                  {t(profile.role)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-4">{t(profile.tagline)}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-4">
              {t({ id: "Navigasi", en: "Navigation" })}
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 lg:grid-cols-2">
              {ui.nav.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="text-[13px] text-ink-3 transition hover:text-accent"
                  >
                    {t(item.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-4">
              {t({ id: "Terhubung", en: "Connect" })}
            </p>
            <ul className="flex gap-2">
              {profile.socials.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <li key={social.label}>
                    <Magnetic strength={0.4}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className="grid size-10 place-items-center rounded-xl border border-hairline bg-elevated text-ink-3 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-ink"
                      >
                        <Icon className="size-[17px]" />
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>

            <Magnetic strength={0.3} className="mt-2">
              <button
                type="button"
                onClick={() => scrollToSection("#home")}
                className="group flex items-center gap-2 rounded-full border border-hairline bg-elevated px-4 py-2.5 text-[12.5px] font-medium text-ink-2 transition hover:border-violet-400/40 hover:text-ink"
              >
                <ArrowUp className="size-3.5 transition group-hover:-translate-y-0.5" />
                {t(ui.footer.backToTop)}
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-12 flex justify-center border-t border-hairline pt-6">
          <p className="text-center text-[12px] text-ink-4">
            © {year ? `${year} ` : ""}
            {profile.name}. {t(ui.footer.rights)}
          </p>
        </div>
      </Container>
    </footer>
  );
}
