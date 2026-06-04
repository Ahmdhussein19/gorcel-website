# gorcel.rules.md
> Authoritative development ruleset for gorcel.com. Applied without exception to every file, component, route, and commit.

---

## 0. Stack & Tooling

| Layer | Choice | Constraint |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | No Pages Router. No CRA. |
| Language | **TypeScript 5 (strict)** | `strict: true`, no `any` |
| Styling | **Tailwind CSS v4** + CSS custom properties | Token-mapped config only — see §3 |
| Components | **shadcn/ui** (Radix primitives) | Unstyled base, Gorcel tokens override |
| Icons | **lucide-react** | No other icon library |
| Fonts | **next/font/google** — DM Sans + DM Mono | No CDN `<link>` in JSX |
| Animation | **Framer Motion** | Only for scroll-reveal and page transitions |
| Forms | **React Hook Form** + **Zod** | No uncontrolled forms |
| Email | **Resend** | Contact form submission only |
| SEO / Meta | **next-seo** or native `generateMetadata()` | One approach, never both |
| Analytics | **Vercel Analytics** + **Google Search Console** | No client-side GA unless required |
| Sitemap | **next-sitemap** | Auto-generated on build |
| Schema | Inline `<script type="application/ld+json">` | In `<head>` via layout |
| Package manager | **pnpm** | No npm/yarn |
| Linting | ESLint + Prettier + Husky pre-commit | Zero warnings in CI |

---

## 1. Project Architecture

```
/
├── app/
│   ├── layout.tsx              ← Root layout: fonts, global SEO, JSON-LD
│   ├── page.tsx                ← Home
│   ├── services/page.tsx
│   ├── work/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts              ← next-sitemap dynamic
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── CtaBand.tsx
│   ├── ui/                     ← shadcn/ui primitives only
│   ├── sections/               ← Page-level section components
│   └── shared/                 ← AccentSquare, SectionLabel, Divider
├── lib/
│   ├── seo.ts                  ← Metadata factory functions
│   ├── schema.ts               ← JSON-LD builders
│   ├── content/                ← Typed content objects (no CMS needed yet)
│   └── utils.ts
├── styles/
│   └── globals.css             ← CSS tokens + Tailwind base
├── public/
│   ├── logo/                   ← SVG variants: dark, light, volt
│   └── og/                     ← OG images per page
└── types/
    └── index.ts
```

**Rules:**
- One component per file. Filename = component name in PascalCase.
- No barrel `index.ts` re-exports in `components/`.
- `sections/` components are never reused across pages — they are page-specific.
- `shared/` components are stateless, presentational only.
- No business logic inside components — extract to `lib/`.

---

## 2. TypeScript

```ts
// tsconfig.json enforced settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

- All props typed via `interface`, never `type` for component props.
- No `as` casting except for JSON-LD schema builders.
- No `!` non-null assertions — handle nullability explicitly.
- Server Components are the default. Add `"use client"` only when required (event handlers, hooks, browser APIs).
- Data fetching: `async` Server Components only. No `useEffect` for data.

---

## 3. Design Tokens — CSS Custom Properties

Defined once in `styles/globals.css`. Never hardcode a value that has a token.

```css
:root {
  /* Colors */
  --color-ink:     #0D0D0D;
  --color-onyx:    #1E1E1E;
  --color-volt:    #C8F000;
  --color-paper:   #F5F5F2;
  --color-bone:    #E8E8E4;
  --color-ink-60:  rgba(13, 13, 13, 0.60);
  --color-ink-30:  rgba(13, 13, 13, 0.30);
  --color-ink-12:  rgba(13, 13, 13, 0.12);

  /* Typography */
  --font-sans: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 40px;  --space-8: 48px;  --space-9: 64px;
  --space-10: 80px; --space-11: 96px; --space-12: 128px;

  /* Layout */
  --margin-page:    64px;
  --margin-page-md: 32px;
  --margin-page-sm: 20px;
  --max-content:    960px;
  --max-text:       640px;

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-0:  0px;

  /* Borders */
  --border-default: 1px solid var(--color-ink-12);
  --border-strong:  1px solid var(--color-ink-30);
  --border-dark:    1px solid rgba(255, 255, 255, 0.08);
  --divider:        0.5px solid var(--color-bone);

  /* Shadows */
  --shadow-card:  0 0 0 1px var(--color-ink-12);
  --shadow-focus: 0 0 0 2px var(--color-volt);

  /* Motion */
  --ease-default:    linear;
  --ease-in-out:     ease-in-out;
  --duration-fast:   150ms;
  --duration-base:   200ms;
  --duration-slow:   300ms;
}
```

**Tailwind v4 mapping** — all tokens aliased in `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#0D0D0D',
        onyx:  '#1E1E1E',
        volt:  '#C8F000',
        paper: '#F5F5F2',
        bone:  '#E8E8E4',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        none: '0px',
      },
      maxWidth: {
        content: '960px',
        text:    '640px',
      },
      transitionTimingFunction: { DEFAULT: 'linear' },
      transitionDuration:       { DEFAULT: '150ms' },
    },
  },
}
export default config
```

---

## 4. Brand Constraints (Non-negotiable)

- **No gradients** — anywhere in CSS.
- **No `border-radius` > 8px** — logo mark and accent squares are always `0`.
- **No `border-radius: 50%`** — no circles in the system.
- **No decorative shadows** — `box-shadow` with blur is forbidden. Elevation = color contrast.
- **No `text-shadow`**.
- **No colors outside the token set.**
- **No fonts outside DM Sans / DM Mono.**
- **Volt (`#C8F000`)** — accent only, max 7% of any composition. Never on body text backgrounds. Never with opacity or gradient.
- **Logo mark** — always `border-radius: 0`. Never uppercase `GORCEL` in wordmark contexts.
- **Icons** — Lucide only. `strokeWidth={1.5}`, `strokeLinecap="square"`, `strokeLinejoin="miter"`, no fill.
- **Motion** — `linear` or `ease-in-out` only. 150–300ms. No bounce, spring, scale pops, or infinite decorative loops.
- **`prefers-reduced-motion`** — always respected:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. SEO / GEO Optimization

### 5.1 Metadata — Per-Page Factory

All metadata generated via a typed factory in `lib/seo.ts`:

```ts
// lib/seo.ts
import type { Metadata } from 'next'

interface PageSEO {
  title: string
  description: string
  path: string
  ogImage?: string
}

const BASE_URL = 'https://gorcel.com'

export function buildMetadata({ title, description, path, ogImage }: PageSEO): Metadata {
  const url = `${BASE_URL}${path}`
  const image = ogImage ?? '/og/default.png'

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Gorcel',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}
```

**Per-page usage:**

```ts
// app/page.tsx
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Custom Software Development in MENA | Gorcel',
  description: "When your tools don't connect and manual work slows you down, Gorcel builds software that fits how your business runs. Fixed cost, full ownership. Cairo-based, serving MENA.",
  path: '/',
})
```

### 5.2 JSON-LD Schema

Defined in `lib/schema.ts`, injected via root layout `<head>`:

```ts
// lib/schema.ts
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gorcel',
  url: 'https://gorcel.com',
  description: 'Custom software development company in Cairo, serving businesses across MENA.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  areaServed: 'MENA',
  email: 'hello@gorcel.com',
  sameAs: [],
} as const

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know if I need custom software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If your team relies on spreadsheets and manual steps to fill gaps your current tools leave, you've likely outgrown off-the-shelf software. That's the point custom software pays off.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We agree on a fixed price before any work starts, so you know the cost upfront. Request a quote for a clear number.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most projects deliver working software within weeks, because we build in short cycles. The timeline is fixed during discovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I own the software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — full source code, full rights, no lock-in, no recurring license fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with businesses outside Egypt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work across MENA and beyond, remotely and on-site.',
      },
    },
  ],
} as const
```

**Injection in `app/layout.tsx`:**

```tsx
import { organizationSchema, faqSchema } from '@/lib/schema'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 5.3 Heading Hierarchy (enforced per page)

| Tag | Rule |
|---|---|
| `h1` | Exactly one per page. Primary keyword must appear within first 60 chars. |
| `h2` | Section titles. Question-led where possible. |
| `h3` | Service/project/FAQ items. Keyword-bearing. |
| `ol` | Process steps (ordered sequences only). |

**Never skip heading levels.** Never use headings for visual styling — use CSS classes on `<p>` or `<span>`.

### 5.4 Semantic HTML

- `<nav>` for navigation, `<main>` wrapping page content, `<footer>`, `<article>` for work entries.
- `<section>` with `aria-label` for every major section.
- Every `<img>` has `alt`. Decorative images use `alt=""` and `aria-hidden="true"`.
- All interactive elements reachable by keyboard. Focus ring: `--shadow-focus` (volt outline).
- `lang="en"` on `<html>`.

### 5.5 GEO Signals

```html
<!-- In root layout <head> -->
<meta name="geo.region" content="EG-C" />
<meta name="geo.placename" content="Cairo" />
<meta name="geo.position" content="30.0444;31.2357" />
<meta name="ICBM" content="30.0444, 31.2357" />
```

- Every page copy references "Cairo", "Egypt", "MENA" naturally — not stuffed.
- Footer includes: Cairo, Egypt · Serving MENA · hello@gorcel.com.
- `address` block in footer uses `<address>` tag.

### 5.6 Performance (Core Web Vitals)

- All images: `next/image` with explicit `width`, `height`, and `priority` on above-fold images.
- Fonts: `next/font/google` with `display: 'swap'`.
- No layout shift from fonts — preload via `next/font`.
- `loading="lazy"` on all below-fold images (automatic via `next/image`).
- No render-blocking scripts. Analytics deferred.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### 5.7 Sitemap & Robots

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gorcel.com'
  const pages = ['', '/services', '/work', '/about', '/contact']
  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://gorcel.com/sitemap.xml',
  }
}
```

---

## 6. Component Contracts

### 6.1 Button

Use shadcn/ui `<Button>` with variant overrides. Never a raw `<button>` except inside shadcn primitives.

```tsx
// variants: 'primary' | 'secondary' | 'accent'
// All styles map to design tokens — no hardcoded colors in component files
```

### 6.2 Section Label

```tsx
// components/shared/SectionLabel.tsx
interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-ink/60">
      {children}
    </p>
  )
}
```

### 6.3 Accent Square

```tsx
// components/shared/AccentSquare.tsx
export function AccentSquare() {
  return (
    <span
      className="inline-block w-2 h-2 bg-volt shrink-0"
      style={{ borderRadius: 0 }}
      aria-hidden="true"
    />
  )
}
```

### 6.4 CTA Band

```tsx
// components/layout/CtaBand.tsx
// Appears on every page. Dark surface (--color-ink bg, --color-paper text).
// Single line copy + btn-accent button. No other content.
```

### 6.5 Nav

- Server Component. No client-side hydration unless mobile menu toggle required.
- Mobile menu: shadcn/ui `<Sheet>` (Radix Dialog). No custom drawer.
- Active link: `--color-volt` accent square indicator, not underline.

### 6.6 Forms (Contact page)

```tsx
// React Hook Form + Zod. shadcn/ui form primitives.
// Fields: name, company, message (required), budget (optional), timeline (optional).
// Submission: Resend API via Next.js Server Action.
// No page reload. No external form service.
```

---

## 7. Content Architecture

All copy lives in typed content objects under `lib/content/`. No strings hardcoded inside components.

```ts
// lib/content/home.ts
export const homeContent = {
  meta: {
    title: 'Custom Software Development in MENA | Gorcel',
    description: "...",
  },
  hero: {
    eyebrow: 'Custom software development · Cairo · Serving MENA',
    h1: 'When your tools stop keeping up, we build the system that does',
    body: 'Web and mobile software for businesses held back by disconnected tools and manual work — at a fixed price, fully owned by you.',
    cta: { primary: 'Get a fixed quote', secondary: 'See what we build' },
  },
  // ...
} as const
```

- `as const` on all content objects — prevents accidental mutation.
- Content objects match the page structure exactly — one object per page.

---

## 8. Internal Linking

| From | To | Method |
|---|---|---|
| Home → Services | Section CTA `<Link href="/services">` | |
| Home → Work | Section CTA `<Link href="/work">` | |
| Services → Contact | CTA Band | |
| Work → Contact | CTA Band | |
| About → Contact | CTA Band | |
| All pages → All pages | Footer nav | |

- All internal links use Next.js `<Link>` — never `<a href>`.
- `prefetch` is on by default — do not disable.

---

## 9. Accessibility

- WCAG 2.1 AA minimum.
- Color contrast: all approved token pairs already meet 4.5:1.
- `aria-label` on all icon-only buttons.
- `aria-expanded` on toggles (mobile nav, FAQ accordions).
- FAQ: shadcn/ui `<Accordion>` (Radix). Keyboard navigable by default.
- Skip-to-main link as first focusable element in layout.
- No `tabIndex > 0`.

---

## 10. Prohibited Patterns

| Pattern | Reason |
|---|---|
| `any` in TypeScript | Defeats type safety |
| `useEffect` for data fetching | Use Server Components |
| Hardcoded hex colors in components | Use tokens |
| Raw `<button>` / `<a>` without semantic purpose | Use shadcn/ui primitives |
| `linear-gradient` / `radial-gradient` | Brand prohibition |
| `border-radius > 8px` or `50%` | Brand prohibition |
| `box-shadow` with blur (decorative) | Brand prohibition |
| Colors / fonts outside the token set | Brand prohibition |
| `console.log` in production code | Remove before merge |
| Page-level `"use client"` | Always Server Component first |
| Inline `style=` for anything with a token equivalent | Use token |
| Magic numbers in CSS (non-token spacing) | Use `--space-*` |
| `!important` | Never |
| Multiple `h1` per page | SEO violation |
| Empty `alt` on informational images | Accessibility violation |

---

## 11. Git & CI

- Branch naming: `feature/`, `fix/`, `chore/`
- Commit format: Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`
- Pre-commit hooks (Husky): ESLint, Prettier, TypeScript compile check
- No direct commits to `main`
- PR required for every merge — no self-merge

---

*gorcel.rules.md · v1.0 · Apply to every file without exception.*
