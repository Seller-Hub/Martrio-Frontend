"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Sparkline from "@/components/dashboard/charts/Sparkline";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down";
  series: number[];
};

export default function StatCard({ title, value, delta, deltaTone, series }: Props) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium">{title}</div>
      </CardHeader>

      <CardContent className="flex items-end justify-between gap-4">
        <div>
          <div className="text-3xl font-semibold tracking-tight">{value}</div>
          <div
            className={cn(
              "mt-2 text-xs",
              deltaTone === "up" ? "text-emerald-600" : "text-red-600"
            )}
          >
            {delta} <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div className="h-12 w-28">
          <Sparkline series={series} tone={deltaTone} />
        </div>
      </CardContent>
    </Card>
  );
}
