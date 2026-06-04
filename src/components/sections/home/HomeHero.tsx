import Link from "next/link";

import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/lib/content/home";

export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section aria-label="Hero" className="py-[var(--space-11)]">
      <SectionLabel>{hero.eyebrow}</SectionLabel>
      <h1 className="mt-6 max-w-text font-sans text-4xl font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
        {hero.h1}
      </h1>
      <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
        {hero.body}
      </p>
      <ul className="mt-8 flex flex-col gap-2 font-sans text-base text-ink">
        {hero.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-volt" style={{ borderRadius: 0 }} />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button variant="accent" asChild>
          <Link href={hero.cta.primary.href}>{hero.cta.primary.label}</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href={hero.cta.secondary.href}>{hero.cta.secondary.label}</Link>
        </Button>
      </div>
    </section>
  );
}
