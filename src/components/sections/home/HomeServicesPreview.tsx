import Link from "next/link";

import { Button } from "@/components/ui/button";
import { homeContent } from "@/lib/content/home";

export function HomeServicesPreview() {
  const { services } = homeContent;

  return (
    <section aria-label="What we build" className="py-[var(--space-10)]">
      <h2 className="font-sans text-2xl font-semibold tracking-[-0.5px] text-ink md:text-[28px]">
        {services.h2}
      </h2>
      <p className="mt-4 max-w-text font-sans text-base leading-relaxed text-ink/60">
        {services.intro}
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {services.items.map((item) => (
          <li
            key={item.title}
            className="border border-ink/12 bg-paper p-6 shadow-[var(--shadow-card)]"
          >
            <h3 className="font-sans text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
      <Button variant="secondary" className="mt-8" asChild>
        <Link href={services.cta.href}>{services.cta.label}</Link>
      </Button>
    </section>
  );
}
