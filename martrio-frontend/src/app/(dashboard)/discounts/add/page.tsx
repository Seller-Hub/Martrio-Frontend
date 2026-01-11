"use client";

import { useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FIELD = "h-11 rounded-xl";

type Step = 1 | 2 | 3;

export default function AddDiscountPage() {
  const [step, setStep] = useState<Step>(1);

  // form state (wire up to your api later)
  const [name, setName] = useState("");
  const [type, setType] = useState<"percent" | "amount" | "bogo" | undefined>();
  const [amount, setAmount] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [allRegions, setAllRegions] = useState(true);

    type Step = 1 | 2 | 3;

    const next = () => setStep((s): Step => (s === 1 ? 2 : 3));
    const prev = () => setStep((s): Step => (s === 3 ? 2 : 1));

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#F5F7FB] px-4 pb-10 pt-6 md:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-3xl font-semibold">Discounts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create a new discount campaign</p>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1200px]">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">New Discount</CardTitle>
          </CardHeader>

          {/* Stepper */}
          <CardContent className="pb-0">
            <Stepper step={step} />
          </CardContent>

          {/* Step 1 – details */}
          {step === 1 && (
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="dname" className="sr-only">Discount Name</Label>
                <Input
                  id="dname"
                  placeholder="Discount Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${FIELD} placeholder:text-muted-foreground/60`}
                />
              </div>

              <div className="space-y-2">
                <Label className="sr-only">Discount Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                    <SelectValue placeholder="Discount Type" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                    <SelectItem value="amount">Fixed Amount</SelectItem>
                    <SelectItem value="bogo">Buy X Get Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="damount" className="sr-only">Discount Amount</Label>
                <Input
                  id="damount"
                  type="number"
                  placeholder="Discount Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`${FIELD} placeholder:text-muted-foreground/60`}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start" className="sr-only">Start Date</Label>
                  <Input
                    id="start"
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className={`${FIELD}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end" className="sr-only">End Date</Label>
                  <Input
                    id="end"
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className={`${FIELD}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border bg-background/50 px-3 py-2">
                <div className="text-sm">
                  <div className="font-medium">Apply to all regions</div>
                  <div className="text-muted-foreground">If off, you’ll select regions per product later.</div>
                </div>
                <Switch checked={allRegions} onCheckedChange={setAllRegions} />
              </div>
            </CardContent>
          )}

          {/* Step 2 – select products */}
          {step === 2 && (
            <CardContent className="space-y-3 pt-6">
              <p className="text-sm text-muted-foreground">
                Choose which products this discount should apply to. (Hook your product picker here.)
              </p>
              <div className="rounded-xl border p-6 text-sm text-muted-foreground">
                TODO: Product selector list / search / checkboxes
              </div>
            </CardContent>
          )}

          {/* Step 3 – per-product/region discounts */}
          {step === 3 && (
            <CardContent className="space-y-3 pt-6">
              <p className="text-sm text-muted-foreground">
                Adjust discount values per product and region if needed.
              </p>
              <div className="rounded-xl border p-6 text-sm text-muted-foreground">
                TODO: Editable table for overrides
              </div>
            </CardContent>
          )}

          {/* footer actions */}
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <Button variant="secondary" className="rounded-xl" onClick={prev} disabled={step === 1}>
                  Back
                </Button>
              </div>
              {step < 3 ? (
                <Button className="rounded-xl bg-[#206cec] text-white hover:bg-[#206cec]/90" onClick={next}>
                  Continue
                </Button>
              ) : (
                <Button
                  className="rounded-xl bg-[#206cec] text-white hover:bg-[#206cec]/90"
                  onClick={() => {
                    // TODO: submit
                    console.log({ name, type, amount, start, end, allRegions });
                  }}
                >
                  Publish
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="grid grid-cols-3 items-center gap-3">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
              n <= step ? "bg-[#206cec] text-white border-[#206cec]" : "bg-background text-foreground/60"
            )}
          >
            {n}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium">
              {n === 1 ? "Discount Details" : n === 2 ? "Select Products" : "Set Discounts"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {n === 1
                ? "Set the basics for your discount campaign."
                : n === 2
                ? "Choose which products this discount will apply to."
                : "Adjust discount values per product and region."}
            </div>
          </div>
          {i < 2 && <div className={cn("ml-3 h-px w-full", n < step ? "bg-[#206cec]" : "bg-muted")} />}
        </div>
      ))}
    </div>
  );
}
