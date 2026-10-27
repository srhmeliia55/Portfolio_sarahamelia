"use client";

import { Check, Copy, Code2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type TokenKind = "plain" | "comment" | "string" | "variable" | "keyword" | "number" | "tag" | "php";

type Token = { text: string; kind: TokenKind };

/** Komentar, string, variabel, kata kunci, angka, dan penanda PHP. */
const PHP_TOKEN_PATTERN = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*|#[^\\n]*)",
    "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')",
    "(\\$[A-Za-z_]\\w*)",
    "\\b(echo|print|if|elseif|else|while|do|for|foreach|as|function|return|break|continue|switch|case|default|true|false|null|isset|empty|array|count|date)\\b",
    "(\\b\\d+(?:\\.\\d+)?\\b)",
    "(<\\?php|<\\?=|\\?>)",
  ].join("|"),
  "g",
);

/** Bagian HTML: komentar dan tag (termasuk <!DOCTYPE>). */
const HTML_TOKEN_PATTERN = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][^>]*>|<![A-Za-z][^>]*>)/g;

const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: "",
  comment: "text-ink-4 italic",
  string: "text-emerald-600 dark:text-emerald-300",
  variable: "text-cyan-700 dark:text-cyan-300",
  keyword: "text-violet-700 dark:text-violet-300",
  number: "text-amber-700 dark:text-amber-300",
  tag: "text-sky-700 dark:text-sky-300",
  php: "text-fuchsia-700 dark:text-fuchsia-300",
};

/** Pecah satu potongan kode memakai pola yang diberikan. */
function splitWithPattern(text: string, pattern: RegExp, kinds: (TokenKind | null)[]): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      tokens.push({ text: text.slice(cursor, match.index), kind: "plain" });
    }

    const groupIndex = match.slice(1).findIndex((value) => value !== undefined);
    tokens.push({ text: match[0], kind: kinds[groupIndex] ?? "plain" });
    cursor = match.index + match[0].length;

    if (match[0].length === 0) break;
  }

  if (cursor < text.length) {
    tokens.push({ text: text.slice(cursor), kind: "plain" });
  }

  return tokens;
}

const PHP_KINDS: (TokenKind | null)[] = ["comment", "string", "variable", "keyword", "number", "php"];

/** Sorot kode PHP sekaligus bagian HTML di sekitarnya. */
function tokenize(code: string): Token[] {
  const chunks = code.split(/(<\?php[\s\S]*?\?>|<\?=[\s\S]*?\?>)/g);

  return chunks.flatMap((chunk) => {
    if (chunk.startsWith("<?php") || chunk.startsWith("<?=")) {
      return splitWithPattern(chunk, PHP_TOKEN_PATTERN, PHP_KINDS);
    }
    return splitWithPattern(chunk, HTML_TOKEN_PATTERN, ["comment", "tag"]);
  });
}

type CodeBlockProps = {
  code: string;
  filename: string;
  labels: { code: string; copy: string; copied: string };
  className?: string;
};

/** Blok kode dengan penyorotan sederhana dan tombol salin. */
export function CodeBlock({ code, filename, labels, className }: CodeBlockProps) {
  const tokens = useMemo(() => tokenize(code), [code]);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard bisa diblokir browser — biarkan kode tetap bisa dipilih manual */
    }
  };

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-hairline bg-canvas-2 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-elevated px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-3">
            <Code2 className="size-3.5 shrink-0 text-ink-4" />
            <span className="truncate">{filename}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? labels.copied : labels.copy}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-wider transition-colors",
            copied
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              : "border-hairline bg-elevated-2 text-ink-3 hover:border-violet-400/40 hover:text-ink",
          )}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? labels.copied : labels.copy}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] text-ink-2">
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={TOKEN_CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
