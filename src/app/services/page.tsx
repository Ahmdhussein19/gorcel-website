import Link from "next/link";

import { Divider } from "@/components/shared/Divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { servicesContent } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: servicesContent.meta.title,
  description: servicesContent.meta.description,
  path: "/services",
});

export default function ServicesPage() {
  const { hero, offerings, process, faq } = servicesContent;

  return (
    <main id="main-content" className="page-margin mx-auto max-w-content pb-[var(--space-12)]">
      <section aria-label="Services overview" className="py-[var(--space-10)]">
        <h1 className="max-w-text font-sans text-4xl font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
          {hero.h1}
        </h1>
        <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
          {hero.body}
        </p>
      </section>

      <Divider />

      {offerings.map((offering) => (
        <section
          key={offering.title}
          aria-label={offering.title}
          className="py-[var(--space-8)]"
        >
          <h2 className="font-sans text-2xl font-semibold text-ink md:text-[28px]">
            {offering.title}
          </h2>
          <p className="mt-4 max-w-text font-sans text-base text-ink/60">
            {offering.description}
          </p>
          <ul className="mt-4 flex max-w-text flex-col gap-2 font-sans text-base text-ink">
            {offering.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      ))}

      <Divider />

      <section aria-label="How we work" className="py-[var(--space-10)]">
        <h2 className="font-sans text-2xl font-semibold text-ink md:text-[28px]">
          {process.h2}
        </h2>
        <p className="mt-4 max-w-text font-sans text-base text-ink/60">{process.intro}</p>
        <ol className="mt-8 flex max-w-text flex-col gap-6">
          {process.steps.map((step, index) => (
            <li key={step.title}>
              <h3 className="font-sans text-xl font-semibold text-ink">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 font-sans text-base text-ink/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Divider />

      <section aria-label="Services FAQ" className="py-[var(--space-10)]">
        <h2 className="font-sans text-2xl font-semibold text-ink md:text-[28px]">
          {faq.h2}
        </h2>
        <Accordion type="single" collapsible className="mt-8 max-w-text">
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`services-faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <p className="sr-only">
        <Link href="/contact">Contact Gorcel in Cairo for a fixed quote</Link>
      </p>
    </main>
  );
}
