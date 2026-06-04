import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeContent } from "@/lib/content/home";

export function HomeFaq() {
  const { faq } = homeContent;

  return (
    <section aria-label="Frequently asked questions" className="py-[var(--space-10)]">
      <h2 className="font-sans text-2xl font-semibold tracking-[-0.5px] text-ink md:text-[28px]">
        {faq.h2}
      </h2>
      <Accordion type="single" collapsible className="mt-8 w-full max-w-text">
        {faq.items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
