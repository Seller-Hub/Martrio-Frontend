// app/login/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  console.log({
    email: form.get("email"),
    password: form.get("password"),
    remember: form.get("remember"),
  });
}

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setLoading(true);
    try {
      await Promise.resolve(onSubmit(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl items-start justify-center gap-6 lg:gap-8 flex-col lg:flex-row">
        <div className="relative w-full lg:w-[560px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/login-side.jpg"
            alt="Auth visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        <Card className="w-full lg:w-[520px] rounded-2xl border shadow-sm flex flex-col min-h-[680px]">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Login to your account</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Let&apos;s get you signed in.</p>
          </CardHeader>

          <CardContent className="pt-0 flex-1">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm underline underline-offset-4">
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required placeholder = "Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" name="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link href="/register" className="text-sm underline underline-offset-4">
                  Sign Up
                </Link>
              </div>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Signing in..." : "Continue"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-4">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4">Terms</Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
