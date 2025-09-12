// app/(auth)/register/[role]/basic/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
  SelectGroup, SelectLabel,
} from "@/components/ui/select";
import { Stepper } from "@/components/register/Stepper";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import countriesData from "world-countries";

type Role = "seller" | "admin" | "customer";

// Build once
const COUNTRY_OPTIONS = countriesData
  .map((c) => ({ value: c.cca2.toLowerCase(), label: c.name.common }))
  .sort((a, b) => a.label.localeCompare(b.label));

const POPULAR = [
  { value: "eu", label: "Europe (EU)" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "tr", label: "Türkiye" },
];

export default function BasicInfoPage() {
  const router = useRouter();
  const params = useParams<{ role: Role }>();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const role = params.role;

  const [region, setRegion] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!["seller", "admin", "customer"].includes(role)) router.replace("/register");
  }, [role, router]);

  async function onSubmit(formData: FormData) {
    formData.set("region", region);

    if (typeof window !== "undefined") {
      const data = Object.fromEntries(formData.entries());
      sessionStorage.setItem("register:basic", JSON.stringify(data));
    }

    if (role === "customer") {
      router.push(`/login?registered=1`);
    } else {
      router.push(`/register/${role}/business?next=${encodeURIComponent(next)}`);
    }
  }

  const total = role === "customer" ? 1 : 2;

  return (
    <Card className="h-full rounded-2xl border shadow-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div />
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
        <Stepper current={1} total={total} labels={["Basic Information", "Business Information"]} />
      </CardHeader>

      <CardContent className="pt-0 flex-1 overflow-auto">
        <form action={onSubmit} className="grid gap-4">
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Region */}
          <div className="grid gap-2">
            <Label htmlFor="region">Your Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectGroup>
                  <SelectLabel>Popular</SelectLabel>
                  {POPULAR.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>All countries</SelectLabel>
                  {COUNTRY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* ensure it's posted */}
            <input type="hidden" name="region" value={region} />
          </div>

          {/* Password with eye */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                minLength={6}
                required
                placeholder="Password"
                className="pr-10 placeholder:text-muted-foreground/60"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password with eye */}
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                minLength={6}
                required
                placeholder="Confirm Password"
                className="pr-10 placeholder:text-muted-foreground/60"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <input type="hidden" name="role" value={role} />

          <Button type="submit" className="mt-2 w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white">
            Continue
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
