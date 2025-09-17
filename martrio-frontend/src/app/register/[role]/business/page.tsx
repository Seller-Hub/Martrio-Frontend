// app/(auth)/register/[role]/business/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Stepper } from "@/components/register/Stepper";
import { ArrowLeft, X } from "lucide-react";

type Role = "seller" | "admin" | "customer";
type BasicInfo = Record<string, string>;
type RegisterPayload = { role: Role } & BasicInfo & Record<string, string>;

function BusinessInfoInner() {
  const params = useParams<{ role: Role }>();
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const role = params.role;

  useEffect(() => {
    if (role === "customer") router.replace("/register/customer/basic");
  }, [role, router]);

  async function onSubmit(formData: FormData) {
    let basic: BasicInfo = {};
    if (typeof window !== "undefined") {
      try {
        basic = JSON.parse(sessionStorage.getItem("register:basic") || "{}") as BasicInfo;
      } catch {}
    }

    const business = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
    ) as Record<string, string>;

    const payload: RegisterPayload = { role, ...basic, ...business };
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(payload) });

    if (typeof window !== "undefined") sessionStorage.removeItem("register:basic");
    router.push(`/login?registered=1`);
  }

  return (
    <Card className="h-full rounded-2xl border shadow-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push(`/register/${role}/basic?next=${encodeURIComponent(next)}`)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h1 className="text-3xl font-semibold tracking-tight leading-none">Create an Account</h1>
          </div>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">Enter your details to get started.</p>

        <Stepper
          current={2}
          total={2}
          labels={["Basic Information", "Business Information"]}
          captions={[
            "Let’s start with your personal details.",
            "Tell us about your business and finish up.",
          ]}
          className="mt-4 px-1"
        />
      </CardHeader>

      <CardContent className="pt-0">
        <form action={onSubmit} className="grid gap-4">
          {/* Company name */}
          <div className="grid gap-2">
            <Label htmlFor="company" className="sr-only">Company name</Label>
            <Input
              id="company"
              name="company"
              required
              placeholder="Company name"
              className="placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Product category */}
          <div className="grid gap-2">
            <Label htmlFor="category" className="sr-only">Product category</Label>
            <Select name="category" required>
              <SelectTrigger
                id="category"
                className="w-full h-10 rounded-md px-4 [&>span[data-placeholder]]:text-muted-foreground/60"
              >
                <SelectValue placeholder="Product category" />
              </SelectTrigger>
              <SelectContent className="w-[--radix-select-trigger-width]">
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home &amp; Living</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Website URL */}
          <div className="grid gap-2">
            <Label htmlFor="website" className="sr-only">Website URL</Label>
            <Input
              id="website"
              name="website"
              type="url"
              required
              placeholder="Insert your website URL"
              className="placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Tax ID */}
          <div className="grid gap-2">
            <Label htmlFor="taxId" className="sr-only">Tax ID</Label>
            <Input
              id="taxId"
              name="taxId"
              required
              placeholder="Tax ID"
              className="placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" name="terms" required />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="underline underline-offset-4">Terms &amp; Conditions</a>
            </label>
          </div>

          <Button type="submit" className="mt-2 w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white">
            Sign me up
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}

export default function BusinessInfoPage() {
  return (
    <Suspense fallback={null}>
      <BusinessInfoInner />
    </Suspense>
  );
}
