"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AccentSquare } from "@/components/shared/AccentSquare";
import { navItems } from "@/lib/content/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 font-sans text-sm font-medium text-ink"
          >
            {isActive ? <AccentSquare /> : <span className="w-2" />}
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
