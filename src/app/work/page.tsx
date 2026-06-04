import { Divider } from "@/components/shared/Divider";
import { workContent } from "@/lib/content/work";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: workContent.meta.title,
  description: workContent.meta.description,
  path: "/work",
});

export default function WorkPage() {
  const { hero, projects, closing } = workContent;

  return (
    <main id="main-content" className="page-margin mx-auto max-w-content pb-[var(--space-12)]">
      <section aria-label="Work overview" className="py-[var(--space-10)]">
        <h1 className="max-w-text font-sans text-4xl font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[40px]">
          {hero.h1}
        </h1>
        <p className="mt-6 max-w-text font-sans text-lg leading-relaxed text-ink/60">
          {hero.body}
        </p>
      </section>

      <Divider />

      {projects.map((project, index) => (
        <article
          key={project.name}
          aria-label={project.name}
          className="border-b border-bone py-[var(--space-9)]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/60">
            Project {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-sans text-2xl font-semibold text-ink">{project.name}</h2>
          <p className="mt-1 font-sans text-base text-ink/60">{project.subtitle}</p>
          <p className="mt-4 font-mono text-xs text-ink/30">{project.type}</p>
          <h3 className="mt-6 font-sans text-lg font-semibold text-ink">The problem</h3>
          <p className="mt-2 max-w-text font-sans text-base text-ink/60">{project.problem}</p>
          <h3 className="mt-6 font-sans text-lg font-semibold text-ink">What we built</h3>
          <p className="mt-2 max-w-text font-sans text-base text-ink/60">{project.built}</p>
          <h3 className="mt-6 font-sans text-lg font-semibold text-ink">The result</h3>
          <p className="mt-2 max-w-text font-sans text-base text-ink/60">{project.result}</p>
          {project.href !== "#" ? (
            <a
              href={project.href}
              className="mt-6 inline-block font-sans text-sm font-semibold text-ink underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              View project →
            </a>
          ) : null}
        </article>
      ))}

      <section aria-label="Next project" className="py-[var(--space-10)]">
        <h2 className="font-sans text-2xl font-semibold text-ink">{closing.h2}</h2>
        <p className="mt-4 max-w-text font-sans text-base text-ink/60">{closing.body}</p>
      </section>
    </main>
  );
}
