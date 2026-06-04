import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ctaBandContent } from "@/lib/content/site";

export function CtaBand() {
  return (
    <section
      aria-label="Call to action"
      className="bg-ink px-[var(--margin-page-sm)] py-[var(--space-10)] text-paper md:px-[var(--margin-page-md)] lg:px-[var(--margin-page)]"
    >
      <div className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-text font-sans text-lg leading-relaxed">
          {ctaBandContent.copy}
        </p>
        <Button variant="accent" asChild>
          <Link href={ctaBandContent.cta.href}>{ctaBandContent.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
