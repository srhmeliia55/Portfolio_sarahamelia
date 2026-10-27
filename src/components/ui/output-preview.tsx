"use client";

import { Globe } from "lucide-react";
import type { OutputLine } from "@/data/web2";
import { cn } from "@/lib/cn";

type OutputPreviewProps = {
  /** Path yang ditampilkan di address bar tiruan. */
  path: string;
  label: string;
  lines: OutputLine[];
  className?: string;
};

/** Panel "browser" untuk memperlihatkan hasil keluaran kode PHP. */
export function OutputPreview({ path, label, lines, className }: OutputPreviewProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-elevated px-4 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </span>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-hairline bg-canvas px-2.5 py-1">
          <Globe className="size-3 shrink-0 text-ink-4" />
          <span className="truncate font-mono text-[10.5px] text-ink-4">{path}</span>
        </div>

        <span className="hidden shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent sm:block">
          {label}
        </span>
      </div>

      <div className="flex-1 space-y-2 bg-canvas-2 px-5 py-5">
        {lines.map((line, index) => (
          <p
            key={`${line.text}-${index}`}
            className={
              line.heading
                ? "font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-ink"
                : "text-[13.5px] leading-relaxed text-ink-2"
            }
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
