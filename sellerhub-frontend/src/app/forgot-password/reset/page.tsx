"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordResetPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (password.length < 8) { setError("Password must be at least 8 characters."); setLoading(false); return; }
    if (password !== confirm) { setError("Passwords do not match."); setLoading(false); return; }

    try {
      await new Promise((r) => setTimeout(r, 500));
      router.push("/forgot-password/success");
    } catch {
      setError("Could not reset password. Try again.");
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
            <h1 className="text-3xl font-semibold tracking-tight">Set New Password</h1>
            <p className="text-sm text-muted-foreground">{email ? `Resetting for ${email}` : "Choose a new password."}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input id="password" name="password" type="password" required placeholder="Enter your new password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" name="confirm" type="password" required placeholder="Re-enter your new password" />
              </div>

              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

              <Button type="submit" className="w-full bg-[#206cec] hover:bg-[#206cec]/90" disabled={loading}>
                {loading ? "Updating..." : "Reset password"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-4">
            <p className="text-xs text-muted-foreground">
              Know your password? <Link href="/login" className="underline underline-offset-4">Back to Login</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
