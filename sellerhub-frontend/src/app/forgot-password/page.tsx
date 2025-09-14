"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    try {
      await new Promise((r) => setTimeout(r, 500));
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    } catch {
      setError("We couldn't send the code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl items-start justify-center gap-6 lg:gap-8 flex-col lg:flex-row">
        <div className="relative w-full lg:w-[560px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image src="/login-side.jpg" alt="Auth visual" fill className="object-cover" priority />
        </div>

        <Card className="w-full lg:w-[520px] rounded-2xl border shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Forgot Password</h1>
            <p className="text-sm text-muted-foreground">Enter your email to receive a verification code.</p>
          </CardHeader>
          <CardContent className="pt-0">
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>

              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

              <Button type="submit" className="w-full bg-[#206cec] hover:bg-[#206cec]/90" disabled={loading}>
                {loading ? "Sending..." : "Continue"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-4">
            <p className="text-xs text-muted-foreground">
              Remembered it? <Link href="/login" className="underline underline-offset-4">Back to Login</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
