// components/register/Stepper.tsx
export function Stepper({
  current,
  total,
  labels,
}: { current: number; total: number; labels: string[] }) {
  return (
    <div className="mt-2 mb-6">
      <div className="h-0.5 w-full bg-muted relative">
        <div
          className="absolute left-0 top-0 h-0.5 bg-[#206cec] transition-all"
          style={{ width: `${((current - 1) / (total - 1 || 1)) * 100}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {labels.slice(0, total).map((label, i) => {
          const step = i + 1;
          const active = step <= current;
          return (
            <div key={label} className="flex flex-col items-center">
              <div className={[
                "h-6 w-6 rounded-full border flex items-center justify-center text-xs",
                active ? "bg-[#206cec] text-white border-[#206cec]" : "bg-white text-muted-foreground border-muted"
              ].join(" ")}>{step}</div>
              <div className="mt-2 text-xs font-medium">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
