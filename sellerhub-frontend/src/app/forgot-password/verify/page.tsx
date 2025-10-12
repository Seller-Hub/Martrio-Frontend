"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPasswordVerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [loading, setLoading] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const code = String(form.get("code") || "");
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Verified", { description: "Your code was accepted.", duration: 1500 }); 
      router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Invalid or expired code.");
      toast.error("Invalid code", { description: "Please try again.", duration: 2000 }); 
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setNotice(null);
    await new Promise((r) => setTimeout(r, 400));
    setNotice("Code sent!");
    toast.success("Code sent", { description: `We re-sent the code to ${email}.`, duration: 1500 });
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl items-start justify-center gap-6 lg:gap-8 flex-col lg:flex-row">
        <div className="relative w-full lg:w-[560px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image src="/login-side.jpg" alt="Auth visual" fill className="object-cover" priority />
        </div>

        <Card className="w-full lg:w-[520px] rounded-2xl border shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Verify Code</h1>
            <p className="text-sm text-muted-foreground">
              {email ? `We sent a 6-digit code to ${email}` : "Enter the 6-digit code."}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            {notice && <div className="mb-3 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{notice}</div>}
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="code">6-digit code</Label>
                <Input
                  id="code"
                  name="code"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="123456"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

              <Button type="submit" className="w-full bg-[#206cec] hover:bg-[#206cec]/90" disabled={loading}>
                {loading ? "Verifying..." : "Continue"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-4 flex items-center justify-between text-xs text-muted-foreground">
            <Link href="/forgot-password" className="underline underline-offset-4">Change email</Link>
            <button onClick={resend} className="underline underline-offset-4" type="button">Resend code</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
