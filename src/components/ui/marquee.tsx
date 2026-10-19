"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Teks berjalan tanpa henti. Konten digandakan agar perulangan mulus.
 * Ditenagai animasi CSS sehingga hemat CPU.
 */
export function Marquee({
  children,
  speed = 38,
  reverse = false,
  className,
  fade = true,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div className={cn("flex w-full overflow-hidden", fade && "mask-x", className)}>
      <div
        className="animate-marquee flex w-max shrink-0 items-center"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
