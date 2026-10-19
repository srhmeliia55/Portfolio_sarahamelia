"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading, SectionShell } from "@/components/ui/section";
import { socialIconMap } from "@/components/ui/social-icons";
import { contact, profile, ui } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { EASE_OUT } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const { t } = useLocale();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update = (field: keyof FormState) => (event: { target: { value: string } }) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent(
      form.subject.trim() || `${t(ui.sections.contact.formSubject)} — ${form.name || profile.name}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setStatus("done");
      setForm(EMPTY_FORM);
      window.setTimeout(() => setStatus("idle"), 4200);
    }, 700);
  };

  const infoItems = [
    { icon: Mail, label: t(ui.sections.contact.emailLabel), value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: t(ui.sections.contact.phoneLabel), value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
    { icon: MapPin, label: t(ui.sections.contact.locationLabel), value: t(profile.location), href: undefined },
  ];

  const inputClass =
    "w-full rounded-xl border border-hairline bg-elevated px-4 py-3 text-[14px] text-ink placeholder:text-ink-4 outline-none transition focus:border-violet-400/50 focus:bg-violet-500/[0.05]";

  return (
    <SectionShell id="contact">
      <Container>
        <SectionHeading
          eyebrow={t(ui.sections.contact.eyebrow)}
          title={t(ui.sections.contact.title)}
          subtitle={t(contact.description)}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Info kontak */}
          <Reveal y={30}>
            <div className="glass ring-gradient flex h-full flex-col gap-6 rounded-3xl p-6 sm:p-7">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {t(contact.headline)}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-3">{t(contact.note)}</p>
              </div>

              <ul className="flex flex-col gap-3">
                {infoItems.map((item) => {
                  const content = (
                    <>
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-hairline bg-elevated text-accent">
                        <item.icon className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-4">
                          {item.label}
                        </span>
                        <span className="truncate text-[13.5px] font-medium text-ink-2">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-3.5 rounded-2xl border border-hairline bg-elevated p-3.5 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06]"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3.5 rounded-2xl border border-hairline bg-elevated p-3.5">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto">
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
                  {t(ui.sections.contact.socialLabel)}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {profile.socials.map((social) => {
                    const Icon = socialIconMap[social.icon];
                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center gap-2 rounded-full border border-hairline bg-elevated px-3.5 py-2 text-[12.5px] text-ink-2 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-ink"
                        >
                          <Icon className="size-[14px]" />
                          {social.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Formulir */}
          <Reveal y={30} delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass ring-gradient flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink-4">
                    {t(ui.sections.contact.formName)}
                  </span>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder={t(ui.sections.contact.placeholderName)}
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink-4">
                    {t(ui.sections.contact.formEmail)}
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder={t(ui.sections.contact.placeholderEmail)}
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-4">
                  {t(ui.sections.contact.formSubject)}
                </span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder={t(ui.sections.contact.placeholderSubject)}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-1 flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-4">
                  {t(ui.sections.contact.formMessage)}
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder={t(ui.sections.contact.placeholderMessage)}
                  className={cn(inputClass, "min-h-32 flex-1 resize-none")}
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-[12px] text-ink-4">
                  {t({
                    id: "Pesan akan terbuka di aplikasi email Anda.",
                    en: "The message will open in your email app.",
                  })}
                </p>

                <Magnetic strength={0.22}>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={status === "sending"}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition",
                      status === "done"
                        ? "bg-emerald-500/90"
                        : "bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_18px_45px_-18px_rgba(167,139,250,0.95)]",
                    )}
                  >
                    {status === "done" ? (
                      <>
                        <CheckCircle2 className="size-4" />
                        {t({ id: "Siap dikirim!", en: "Ready to send!" })}
                      </>
                    ) : status === "sending" ? (
                      <>
                        <Send className="size-4 animate-pulse" />
                        {t(ui.actions.sending)}
                      </>
                    ) : (
                      <>
                        <Send className="size-4 transition group-hover:translate-x-0.5" />
                        {t(ui.actions.send)}
                      </>
                    )}
                  </motion.button>
                </Magnetic>
              </div>

              {status === "done" ? (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="text-[12.5px] text-emerald-700 dark:text-emerald-300/90"
                >
                  {t({
                    id: "Terima kasih! Jendela email Anda sudah dibuka.",
                    en: "Thank you! Your email client should be open now.",
                  })}
                </motion.p>
              ) : null}
            </form>
          </Reveal>
        </div>

        {/* Pintasan email langsung */}
        <Reveal y={18} className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="group mx-auto flex w-fit items-center gap-2 text-[13.5px] text-ink-4 transition hover:text-accent"
          >
            <Mail className="size-3.5" />
            {profile.email}
            <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </SectionShell>
  );
}
