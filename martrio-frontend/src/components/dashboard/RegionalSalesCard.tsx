"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// OPTIONAL: world map (requires react-simple-maps + d3-scale)
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";

type RegionRow = {
  country: string;
  code: string; // for flag emoji
  sales: number;
  amount: string;
  delta: string;
  tone: "up" | "down";
};

const REGIONS: RegionRow[] = [
  { country: "United Kingdom", code: "🇬🇧", sales: 215, amount: "$8,420", delta: "+8%", tone: "up" },
  { country: "Switzerland", code: "🇨🇭", sales: 150, amount: "$5,500", delta: "+8%", tone: "up" },
  { country: "Italy", code: "🇮🇹", sales: 55, amount: "$2,415", delta: "-2%", tone: "down" },
];

export default function RegionalSalesCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">Regional Sales</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Map area */}
        <div className="h-[180px] overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-white">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            World map (optional)
          </div>

          {/*
          // If you want a real map:
          // 1) Put this file into: public/maps/countries-110m.json
          //    You can download it from: https://unpkg.com/world-atlas@2/countries-110m.json
          const geoUrl = "/maps/countries-110m.json";
          const color = scaleLinear<string>().domain([0, 300]).range(["#dbeafe", "#2563eb"]);

          <ComposableMap projectionConfig={{ scale: 120 }} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color(80)}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
          */}
        </div>

        {/* Region list */}
        <div className="space-y-3">
          {REGIONS.map((r) => (
            <div key={r.country} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-xl">{r.code}</div>
                <div>
                  <div className="text-sm font-medium">{r.country}</div>
                  <div className="text-xs text-muted-foreground">{r.sales} sales</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">{r.amount}</div>
                <div className={cn("text-xs", r.tone === "up" ? "text-emerald-600" : "text-red-600")}>
                  {r.delta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
