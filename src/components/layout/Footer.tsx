import Link from "next/link";

import { footerContent, navItems } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="page-margin border-t border-bone py-[var(--space-9)]">
      <div className="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-lg font-semibold text-ink">Gorcel</span>
          <p className="font-sans text-sm text-ink/60">{footerContent.tagline}</p>
          <address className="not-italic font-sans text-sm text-ink/60">
            <a href={`mailto:${footerContent.email}`} className="hover:text-ink">
              {footerContent.email}
            </a>
          </address>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-sm text-ink/60 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-content font-mono text-xs text-ink/30">
        {footerContent.copyright}
      </p>
    </footer>
  );
}
