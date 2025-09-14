"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordSuccessPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl items-start justify-center gap-6 lg:gap-8 flex-col lg:flex-row">
        <div className="relative w-full lg:w-[560px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image src="/login-side.jpg" alt="Auth visual" fill className="object-cover" priority />
        </div>

        <Card className="w-full lg:w-[520px] rounded-2xl border shadow-sm">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Password Updated</h1>
            <p className="text-sm text-muted-foreground">You can now sign in with your new password.</p>
          </CardHeader>
          <CardContent className="pt-0">
            <Link href="/login">
              <Button className="w-full bg-[#206cec] hover:bg-[#206cec]/90">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
