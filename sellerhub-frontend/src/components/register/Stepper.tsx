// src/components/register/Stepper.tsx
"use client";
import * as React from "react";

type Props = {
  current: number;
  total: number;
  labels?: string[];
  captions?: string[];
  className?: string;
};

export function Stepper({ current, total, labels = [], captions = [], className }: Props) {
  if (total <= 1) return null;
  
  const t = Math.max(1, total);
  const c = Math.min(Math.max(1, current), t);

  // center of current step
  const centerPct = ((c - 0.5) / t) * 100;

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {/* Track */}
      <div className="relative h-[2px] w-full rounded bg-muted">
        {/* Blue up to current dot center */}
        <div
          className="absolute left-0 top-0 h-[2px] rounded bg-[#206cec] transition-all"
          style={{ width: `${centerPct}%` }}
        />

        {/* Dots at the center of each column */}
        {Array.from({ length: t }).map((_, i) => {
          const step = i + 1;
          const state = step < c ? "done" : step === c ? "current" : "todo";
          const leftPct = ((i + 0.5) / t) * 100;

          const base = "block h-5 w-5 rounded-full border-2"; // <-- block fixes the circle
          const cls =
            state === "done"
              ? `${base} bg-[#206cec] border-[#206cec]`
              : state === "current"
              ? `${base} bg-white border-[#206cec] ring-4 ring-[#206cec]/20`
              : `${base} bg-white border-muted`;

          return (
            <span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
              style={{ left: `${leftPct}%` }}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className={cls} />
            </span>
          );
        })}
      </div>

      {/* Labels + captions */}
      <div
        className="mt-3 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${t}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: t }).map((_, i) => {
          const step = i + 1;
          const active = step === c;
          return (
            <div key={i} className="text-center">
              <div className={active ? "text-sm font-semibold" : "text-sm text-muted-foreground"}>
                {labels[i] ?? `Step ${step}`}
              </div>
              {captions[i] && (
                <div className="text-xs text-muted-foreground">
                  {captions[i]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
