import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Nav() {
  return (
    <header className="page-margin border-b border-ink/12 py-[var(--space-5)]">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6">
        <Link
          href="/"
          className="font-sans text-lg font-semibold tracking-tight text-ink"
        >
          Gorcel
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="accent" className="hidden md:inline-flex" asChild>
            <Link href="/contact">Get a fixed quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
