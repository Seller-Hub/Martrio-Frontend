// components/register/Stepper.tsx
import * as React from "react";

type StepperProps = {
  /** 1-based index of the current step */
  current: number;
  /** total number of steps (>=1) */
  total: number;
  /** Optional labels shown under each dot (use length === total for best look) */
  labels?: string[];
  className?: string;
};

export function Stepper({ current, total, labels = [], className }: StepperProps) {
  const t = Math.max(1, total);
  const c = Math.min(Math.max(1, current), t);
  const pct = t === 1 ? 0 : ((c - 1) / (t - 1)) * 100;

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {/* progress line */}
      <div className="relative h-px w-full rounded bg-muted">
        <div
          className="absolute left-0 top-0 h-px rounded bg-[#206cec] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* dots + labels */}
      <div className="mt-4 flex items-start justify-between">
        {Array.from({ length: t }).map((_, i) => {
          const step = i + 1;
          const active = step <= c;
          return (
            <div key={step} className="flex min-w-0 flex-col items-center text-center">
              <div
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                  active ? "bg-[#206cec] text-white border-[#206cec]" : "bg-white text-muted-foreground border-muted",
                ].join(" ")}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${step}${labels[i] ? `: ${labels[i]}` : ""}`}
              >
                {step}
              </div>
              {labels[i] && (
                <div className="mt-2 text-xs font-medium truncate max-w-[10rem]">{labels[i]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
