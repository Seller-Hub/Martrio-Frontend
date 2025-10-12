"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart, UserRound } from "lucide-react";

type Role = "seller" | "customer" | "admin";

function RegisterRoleInner() {
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
      <CardHeader className="pb-2 shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Choose Your Account Type</p>
      </CardHeader>

      <CardContent className="pt-0 flex-1 overflow-visible min-h-0">
        <div className="grid grid-rows-3 gap-3 h-full">
          {options.map(({ key, title, desc, Icon }) => {
            const selected = role === key;

            const tileClass = [
              "group w-full h-full rounded-2xl border text-center px-5 py-5 shadow-sm",
              "[@media(max-height:1080px)]:py-3",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#206cec]/40",
              selected
                ? "bg-blue-50 border-[#206cec]"
                : "bg-white border-gray-200 hover:border-[#206cec]"
            ].join(" ");

           const iconWrapClass = [
             "inline-flex items-center justify-center h-11 w-11 rounded-xl leading-none shrink-0 select-none",
             "[@media(max-height:1080px)]:h-10 [@media(max-height:1080px)]:w-10",
             "ring-1 ring-[#206cec]/20",
             selected ? "ring-[#206cec]/40 bg-[#206cec]/5" : "bg-transparent"
           ].join(" ");

            return (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                aria-pressed={selected}
                className={tileClass}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <span className={iconWrapClass}>
                  <Icon className="h-6 w-6 shrink-0 leading-none text-[#206cec]" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="text-base font-semibold">{title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-4">
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

export default function RegisterRolePage() {
  return (
    <Suspense fallback={null}>
      <RegisterRoleInner />
    </Suspense>
  );
}
