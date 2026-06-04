import { aboutContent } from "@/lib/content/about";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
  path: "/about",
});

export default function AboutPage() {
  const { hero, vision, location } = aboutContent;

  return (
    <main id="main-content" className="content-shell pb-[var(--space-12)]">
      <section aria-label="About Gorcel" className="py-[var(--space-10)]">
        <h1 className="max-w-text font-sans text-4xl font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
          {hero.h1}
        </h1>
      </section>

      <section aria-label="Vision" className="py-[var(--space-8)]">
        <h2 className="font-sans text-2xl font-semibold text-ink md:text-[28px]">
          {vision.h2}
        </h2>
        <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
          {vision.body}
        </p>
      </section>

      <section aria-label="Location" className="py-[var(--space-8)]">
        <h2 className="font-sans text-2xl font-semibold text-ink md:text-[28px]">
          {location.h2}
        </h2>
        <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
          {location.body}
        </p>
      </section>
    </main>
  );
}
