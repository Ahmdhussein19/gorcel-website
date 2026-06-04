import { homeContent } from "@/lib/content/home";

export function HomeProblem() {
  const { problem } = homeContent;

  return (
    <section aria-label="Problem" className="py-[var(--space-10)]">
      <h2 className="max-w-text font-sans text-2xl font-semibold tracking-[-0.5px] text-ink md:text-[28px]">
        {problem.h2}
      </h2>
      <p className="mt-6 max-w-text font-sans text-base leading-relaxed text-ink/60">
        {problem.intro}
      </p>
      <h3 className="mt-8 font-sans text-xl font-semibold text-ink">
        {problem.signsTitle}
      </h3>
      <ul className="mt-4 flex max-w-text flex-col gap-3 font-sans text-base text-ink/60">
        {problem.signs.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>
      <p className="mt-6 max-w-text font-sans text-base leading-relaxed text-ink">
        {problem.closing}
      </p>
    </section>
  );
}
