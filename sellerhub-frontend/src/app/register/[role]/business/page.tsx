// app/(auth)/register/[role]/business/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Stepper } from "@/components/register/Stepper";

type Role = "seller" | "admin" | "customer";

export default function BusinessInfoPage() {
  const params = useParams<{ role: Role }>();
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const role = params.role;

  // Guard: customers should never be here
  useEffect(() => {
    if (role === "customer") router.replace("/register/customer/basic");
  }, [role, router]);

  async function onSubmit(formData: FormData) {
    // Gather step-1 data + step-2 data. Replace this with a server action / API call.
    let basic: any = {};
    if (typeof window !== "undefined") {
      try { basic = JSON.parse(sessionStorage.getItem("register:basic") || "{}"); } catch {}
    }
    const business = Object.fromEntries(formData.entries());
    const payload = { role, ...basic, ...business };

    // TODO: send to backend
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(payload) });

    // Clear temp storage and redirect
    if (typeof window !== "undefined") sessionStorage.removeItem("register:basic");
    router.push(`/login?registered=1`);
  }

  return (
    <Card className="rounded-2xl border shadow-sm flex flex-col">
      <CardHeader className="pb-2">
        <h1 className="text-3xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
        <Stepper current={2} total={2} labels={["Basic Information", "Business Information"]} />
      </CardHeader>

      <CardContent className="pt-0">
        <form action={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company name</Label>
            <Input id="company" name="company" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Product category</Label>
            <Select name="category" required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website URL</Label>
            <Input id="website" name="website" type="url" placeholder="https://example.com" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="taxId">Tax ID</Label>
            <Input id="taxId" name="taxId" required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" name="terms" required />
            <label htmlFor="terms" className="text-sm">
              I agree to the <a href="/terms" className="underline underline-offset-4">Terms &amp; Conditions</a>
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
