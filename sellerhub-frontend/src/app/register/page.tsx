// app/register/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart, UserRound } from "lucide-react";

type Role = "seller" | "customer" | "admin";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("seller");

  const options: { key: Role; title: string; desc: string; Icon: React.ComponentType<any> }[] = [
    { key: "seller",   title: "Seller",   desc: "Sell Your Products to More People.", Icon: Store },
    { key: "customer", title: "Customer", desc: "Shop and Enjoy Exclusive Offers.",  Icon: ShoppingCart },
    { key: "admin",    title: "Admin",    desc: "Become Regional Partner and Earn Commissions.", Icon: UserRound },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      {/* Equal heights on desktop without forcing a fixed height */}
      <div className="flex w-full max-w-6xl gap-6 lg:gap-8 flex-col lg:flex-row lg:items-stretch">
        {/* LEFT: image panel matches the card height via self-stretch */}
        <div className="relative hidden lg:block lg:w-[560px] self-stretch overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/login-side.jpg"
            alt="Auth visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT: form panel (auto height, no overflow outside) */}
        <Card className="w-full lg:w-[820px] rounded-2xl border shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Create an Account</h1>
            <p className="text-sm text-muted-foreground">Choose Your Account Type</p>
          </CardHeader>

          <CardContent className="pt-0 flex-1">
            {/* Role selector tiles */}
            <div className="grid gap-4">
              {options.map(({ key, title, desc, Icon }) => {
                const selected = role === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    aria-pressed={selected}
                    className={[
                      "group w-full rounded-2xl border transition-colors shadow-sm text-center",
                      "px-5 py-6", // tall but not excessive
                      selected
                        ? "bg-blue-50 border-[#206cec]"
                        : "bg-white border-gray-200 hover:border-[#206cec] hover:bg-blue-50/60",
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className={["flex h-16 w-16 items-center justify-center rounded-xl",
                        selected ? "bg-white/40" : "bg-blue-50"].join(" ")}>
                        <Icon className="h-7 w-7 text-[#206cec]" />
                      </span>
                      <div className="text-lg font-semibold">{title}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hidden field to submit the chosen role (if this posts somewhere) */}
            <input type="hidden" name="role" value={role} />

            <div className="mt-5">
              <Button type="submit" className="w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white">
                Continue
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-[#206cec] hover:text-[#206cec]/90 underline underline-offset-4">
                Log in
              </Link>
            </p>
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
