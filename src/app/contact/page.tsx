import { ContactForm } from "@/components/sections/contact/ContactForm";
import { contactContent } from "@/lib/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: contactContent.meta.title,
  description: contactContent.meta.description,
  path: "/contact",
});

export default function ContactPage() {
  const { hero, sidePanel } = contactContent;

  return (
    <main id="main-content" className="content-shell pb-[var(--space-12)]">
      <div className="grid gap-12 py-[var(--space-10)] lg:grid-cols-[1fr_280px]">
        <section aria-label="Contact form">
          <h1 className="max-w-text font-sans text-4xl font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
            {hero.h1}
          </h1>
          <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
            {hero.body}
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </section>

        <aside
          aria-label="Contact details"
          className="flex flex-col gap-4 border border-ink/12 bg-bone/30 p-6"
        >
          <a
            href={`mailto:${sidePanel.email}`}
            className="font-sans text-base font-semibold text-ink"
          >
            {sidePanel.email}
          </a>
          <p className="font-sans text-sm text-ink/60">{sidePanel.location}</p>
          <p className="font-sans text-sm text-ink/60">{sidePanel.region}</p>
          <p className="mt-4 font-sans text-sm leading-relaxed text-ink/60">
            {sidePanel.nextSteps}
          </p>
        </aside>
      </div>
    </main>
  );
}
