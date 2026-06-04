"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { AccentSquare } from "@/components/shared/AccentSquare";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/content/site";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={undefined}
        >
          <Menu
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="size-5"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-label="Mobile navigation">
        <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 font-sans text-base font-medium text-ink"
              >
                {isActive ? <AccentSquare /> : <span className="w-2" />}
                {item.label}
              </Link>
            );
          })}
          <Button variant="accent" className="mt-4" asChild>
            <Link href="/contact">Get a fixed quote</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
