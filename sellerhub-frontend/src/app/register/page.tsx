// app/register/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Store, ShoppingCart, UserRound } from "lucide-react";

type Role = "seller" | "customer" | "admin";

export default function RegisterPage() {
  const [role, setRole] = useState<Role | null>("seller"); // preselect if you like

  const options: { key: Role; title: string; desc: string; Icon: any }[] = [
    { key: "seller",   title: "Seller",   desc: "Sell Your Products to More People.", Icon: Store },
    { key: "customer", title: "Customer", desc: "Shop and Enjoy Exclusive Offers.",  Icon: ShoppingCart },
    { key: "admin",    title: "Admin",    desc: "Become Regional Partner and Earn Commissions.", Icon: UserRound },
  ];

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl items-start justify-center gap-6 lg:gap-8 flex-col lg:flex-row">
        {/* LEFT: image panel */}
        <div className="relative w-full lg:w-[560px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/login-side.jpg"
            alt="Auth visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT: form panel */}
        <Card className="w-full lg:w-[520px] rounded-2xl border shadow-sm flex flex-col min-h-[680px]">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold tracking-tight">Create an Account</h1>
            <p className="text-sm text-muted-foreground">Choose Your Account Type</p>
          </CardHeader>

          <CardContent className="pt-0 flex-1">
            <form className="grid gap-5">
              {/* --- Role selector tiles --- */}
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
                        "group relative w-full rounded-2xl border transition-colors shadow-sm",
                        "px-5 py-6 md:py-8 text-left",
                        selected
                          ? "bg-[#206cec] border-[#206cec] text-white"
                          : "bg-white border-gray-200 hover:border-[#206cec] hover:bg-blue-50/60",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={[
                            "flex h-12 w-12 items-center justify-center rounded-xl",
                            selected ? "bg-white/10" : "bg-blue-50",
                          ].join(" ")}
                        >
                          <Icon className={selected ? "h-6 w-6 text-white" : "h-6 w-6 text-[#206cec]"} />
                        </div>
                        <div className="flex-1">
                          <div className={selected ? "text-lg font-semibold" : "text-lg font-semibold text-foreground"}>
                            {title}
                          </div>
                          <div className={selected ? "text-xs text-white/90" : "text-xs text-muted-foreground"}>
                            {desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hidden field to submit selected role */}
              <input type="hidden" name="role" value={role ?? ""} />

              <Button type="submit" className="w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white">
                Continue
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#206cec] hover:text-[#206cec]/90"
              >
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
