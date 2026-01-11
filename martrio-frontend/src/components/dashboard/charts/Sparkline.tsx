"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";

export default function Sparkline({
  series,
  tone,
}: {
  series: number[];
  tone: "up" | "down";
}) {
  const data = series.map((v, i) => ({ i, v }));

  // No explicit colors requested? If you want exact green/red like screenshot, keep these.
  const stroke = tone === "up" ? "#16a34a" : "#dc2626";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={stroke}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
