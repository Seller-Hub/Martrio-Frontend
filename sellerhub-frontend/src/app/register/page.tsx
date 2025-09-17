"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart, UserRound } from "lucide-react";

type Role = "seller" | "customer" | "admin";

export default function RegisterRolePage() {
  const [role, setRole] = useState<Role>("seller");
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/";

  const options = [
    { key: "seller",   title: "Seller",   desc: "Sell Your Products to More People.", Icon: Store },
    { key: "customer", title: "Customer", desc: "Shop and Enjoy Exclusive Offers.",  Icon: ShoppingCart },
    { key: "admin",    title: "Admin",    desc: "Become Regional Partner and Earn Commissions.", Icon: UserRound },
  ] as const;

  return (
    <Card className="h-full rounded-2xl border shadow-sm flex flex-col overflow-hidden">
      {/* header stays fixed height */}
      <CardHeader className="pb-2 shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Choose Your Account Type</p>
      </CardHeader>

      {/* only this section scrolls if content is tall */}
      <CardContent className="pt-0 flex-1 overflow-visible lg:overflow-auto lg:min-h-0">
        <div className="grid gap-3">
          {options.map(({ key, title, desc, Icon }) => {
            const selected = role === key;

            const tileClass = [
              "group w-full rounded-2xl border text-center px-5 py-5 shadow-sm",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#206cec]/40",
              selected
                ? "bg-blue-50 border-[#206cec]"               // SELECTED
                : "bg-white border-gray-200 hover:border-[#206cec]" // HOVER = border only
            ].join(" ");

            const iconWrapClass = [
              "flex items-center justify-center rounded-xl h-12 w-12",
              selected ? "bg-blue-100" : "bg-blue-50"          // no change on hover
            ].join(" ");

            return (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                aria-pressed={selected}
                aria-selected={selected}
                className={tileClass}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className={iconWrapClass}>
                    <Icon className="h-5 w-5 text-[#206cec]" />
                  </span>
                  <div className="text-base font-semibold">{title}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>

      {/* footer stays pinned; no overflow */}
      <CardFooter className="mt-auto flex flex-col gap-2 pt-4">
        <Button
          className="w-full bg-[#206cec] hover:bg-[#206cec]/90 text-white"
          onClick={() => router.push(`/register/${role}/basic?next=${encodeURIComponent(next)}`)}
        >
          Continue
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-[#206cec] hover:text-[#206cec]/90 underline underline-offset-4">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
