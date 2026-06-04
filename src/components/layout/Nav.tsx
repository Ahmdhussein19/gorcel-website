"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Nav() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-linear",
        hasScrolled
          ? "border-ink/12 bg-transparent"
          : "border-transparent bg-transparent backdrop-blur-none",
      )}
      style={{
        backdropFilter: hasScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: hasScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="content-shell flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-[var(--space-3)]"
          aria-label="Gorcel home"
        >
          <Image
            src="/logo/2.svg"
            alt=""
            width={26}
            height={32}
            priority
            className="h-auto w-[26px] shrink-0 rounded-none"
          />
          <Image
            src="/logo/dark word.svg"
            alt=""
            width={81}
            height={24}
            priority
            className="h-6 w-auto shrink-0"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="accent" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/contact">Get a fixed quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
