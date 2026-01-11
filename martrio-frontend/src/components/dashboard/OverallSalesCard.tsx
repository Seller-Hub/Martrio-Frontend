"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 160 },
  { month: "Mar", value: 140 },
  { month: "Apr", value: 250 },
  { month: "May", value: 120 },
  { month: "Jun", value: 520 },
];

export default function OverallSalesCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Overall Sales</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold">$976</div>
          <Badge variant="secondary" className="rounded-full">
            ↑ 12%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
