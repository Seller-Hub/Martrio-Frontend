"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Boxes,
  ShoppingCart,
  Percent,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const NAV: NavItem[] = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/products/add", icon: Boxes, label: "Products" },
  { href: "/discounts/add", icon: Percent, label: "Discounts" },
  { href: "/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[72px] shrink-0 flex-col items-center border-r bg-background py-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <span className="text-sm font-bold">M</span>
      </div>

      <nav className="flex w-full flex-1 flex-col items-center gap-2 px-2">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              variant={active ? "secondary" : "ghost"}
              size="icon"
              className={cn(
                "h-10 w-10 rounded-xl",
                active && "bg-muted text-foreground"
              )}
              asChild
            >
              <Link href={item.href} aria-label={item.label} title={item.label}>
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          );
        })}
      </nav>

      <Separator className="my-3 w-8" />

      <div className="flex flex-col items-center gap-2 px-2">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" asChild>
          <Link href="/settings" aria-label="Settings" title="Settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" aria-label="Logout" title="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </aside>
  );
}
