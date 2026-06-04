# Gorcel Design Rules
> For AI coding agents (Cursor / Codex). Apply these rules to every component, page, and UI element without exception.

---

## 1. Color Tokens

Use these exact values. Never hardcode any other color.

```css
--color-ink:     #0D0D0D;  /* Primary text, marks, dark surfaces */
--color-onyx:    #1E1E1E;  /* Elevated dark surfaces, cards on dark */
--color-volt:    #C8F000;  /* Accent only — max 7% of any composition */
--color-paper:   #F5F5F2;  /* Primary background */
--color-bone:    #E8E8E4;  /* Secondary surface, dividers on light */

/* Ink alpha variants */
--color-ink-60:  rgba(13, 13, 13, 0.60);  /* Secondary text */
--color-ink-30:  rgba(13, 13, 13, 0.30);  /* Placeholder, disabled */
--color-ink-12:  rgba(13, 13, 13, 0.12);  /* Dividers, borders */
```

### Rules
- Volt is an accent — never use as a large background, never on body text
- No gradients, no transparency on Volt
- No colors outside this token set
- Approved text-on-background pairs only:

| Text         | Background   |
|--------------|--------------|
| `--color-ink`   | `--color-paper` |
| `--color-paper` | `--color-ink`   |
| `--color-ink`   | `--color-volt`  |
| `--color-volt`  | `--color-ink`   |
| `--color-paper` | `--color-onyx`  |

---

## 2. Typography

### Font Stack
```css
--font-sans: 'DM Sans', sans-serif;
--font-mono: 'DM Mono', monospace;
```

### Load (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
```

### Type Scale
```css
--text-display: 56px;   font-weight: 700;  letter-spacing: -1.5px; line-height: 1.05;
--text-h1:      40px;   font-weight: 700;  letter-spacing: -1px;   line-height: 1.1;
--text-h2:      28px;   font-weight: 600;  letter-spacing: -0.5px; line-height: 1.15;
--text-h3:      20px;   font-weight: 600;  letter-spacing: -0.3px; line-height: 1.2;
--text-h4:      16px;   font-weight: 600;  letter-spacing: 0;      line-height: 1.3;
--text-lg:      18px;   font-weight: 400;  letter-spacing: 0;      line-height: 1.7;
--text-base:    16px;   font-weight: 400;  letter-spacing: 0;      line-height: 1.7;
--text-sm:      14px;   font-weight: 400;  letter-spacing: 0;      line-height: 1.6;
--text-caption: 11px;   font-weight: 500;  letter-spacing: 0.10em; line-height: 1.5; font-family: var(--font-mono); text-transform: uppercase;
--text-label:   12px;   font-weight: 500;  letter-spacing: 0.08em; line-height: 1.5; font-family: var(--font-mono); text-transform: uppercase;
--text-cta:     14px;   font-weight: 600;  letter-spacing: 0.04em;
```

### Rules
- `--font-mono` for: labels, captions, section numbers, code blocks, technical specs, monospaced data
- `--font-sans` for everything else
- Never set `Gorcel` wordmark in all-caps
- Never use any font outside this stack

---

## 3. Spacing System

Base unit: **8px**. All spacing in multiples of 8.

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  24px;
--space-6:  32px;
--space-7:  40px;
--space-8:  48px;
--space-9:  64px;
--space-10: 80px;
--space-11: 96px;
--space-12: 128px;
```

### Page Layout
```css
--margin-page:    64px;   /* Desktop horizontal page margin */
--margin-page-md: 32px;   /* Tablet */
--margin-page-sm: 20px;   /* Mobile */
--max-content:    960px;  /* Max content width */
--max-text:       640px;  /* Max readable text column width */
```

---

## 4. Border Radius

```css
--radius-sm: 2px;   /* Tags, badges, small UI chips */
--radius-md: 4px;   /* Cards, inputs, buttons */
--radius-lg: 8px;   /* Modals, panels */
--radius-0:  0px;   /* Logo mark, accent squares, structural elements */
```

### Rules
- Logo mark: always `border-radius: 0`
- Accent square graphic element: always `border-radius: 0`
- Default UI components: `--radius-md` (4px)
- Never use `border-radius` above 8px
- Never use `border-radius: 50%` (no circles in the brand system)

---

## 5. Shadows & Elevation

No decorative drop shadows. Elevation is communicated through color contrast only.

```css
/* Only permitted shadow — subtle border replacement on light backgrounds */
--shadow-card: 0 0 0 1px var(--color-ink-12);

/* Focus ring — accessibility only */
--shadow-focus: 0 0 0 2px var(--color-volt);
```

### Rules
- No `box-shadow` with blur/spread for decoration
- No `text-shadow`
- No `filter: drop-shadow()`
- Elevation = darker background, never shadow

---

## 6. Border & Dividers

```css
--border-default: 1px solid var(--color-ink-12);
--border-strong:  1px solid var(--color-ink-30);
--border-dark:    1px solid rgba(255, 255, 255, 0.08);  /* On dark surfaces */
--divider:        0.5px solid var(--color-bone);
```

---

## 7. Components

### Buttons

```css
/* Primary */
.btn-primary {
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: opacity 150ms linear;
}
.btn-primary:hover { opacity: 0.85; }

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--color-ink);
  border: 2px solid var(--color-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 150ms linear, color 150ms linear;
}
.btn-secondary:hover {
  background: var(--color-ink);
  color: var(--color-paper);
}

/* Accent */
.btn-accent {
  background: var(--color-volt);
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: opacity 150ms linear;
}
.btn-accent:hover { opacity: 0.88; }
```

### Cards

```css
.card {
  background: var(--color-paper);
  border: 1px solid var(--color-ink-12);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.card-dark {
  background: var(--color-onyx);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}
```

### Section Labels (Mono caps)

```css
.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-60);
}
```

### Dividers

```css
.divider {
  height: 1px;
  background: var(--color-bone);
  border: none;
  margin: var(--space-6) 0;
}

.divider-dark {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
}
```

### Accent Square (Brand graphic element)

```css
.accent-square {
  width: 8px;
  height: 8px;
  background: var(--color-volt);
  border-radius: 0;
  flex-shrink: 0;
}
```

### Code / Mono blocks

```css
.code-block {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--color-onyx);
  color: var(--color-paper);
  padding: var(--space-5);
  border-radius: var(--radius-md);
  overflow-x: auto;
  line-height: 1.6;
}
```

### Input / Form fields

```css
.input {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--color-ink);
  background: var(--color-paper);
  border: 1px solid var(--color-ink-30);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  outline: none;
  transition: border-color 150ms linear;
}
.input:focus {
  border-color: var(--color-ink);
  box-shadow: var(--shadow-focus);
}
.input::placeholder {
  color: var(--color-ink-30);
}
```

---

## 8. Icons

- Library: **Lucide**
- Stroke width: **1.5px**
- Size default: **24×24px**
- `stroke-linecap: square`
- `stroke-linejoin: miter`
- No fill — outline only
- Color: inherit from parent or set explicitly using color tokens

```tsx
// Correct Lucide usage
import { ArrowRight } from 'lucide-react'

<ArrowRight
  size={24}
  strokeWidth={1.5}
  strokeLinecap="square"
  strokeLinejoin="miter"
  color="currentColor"
/>
```

---

## 9. Motion & Animation

```css
--ease-default: linear;
--ease-in-out:  ease-in-out;
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
```

### Rules
- `linear` or `ease-in-out` only — no `ease-bounce`, no spring physics
- Duration: 150–250ms for interactions, up to 300ms for page transitions
- Elements construct or slide in — no scale pops, no float-in effects
- No `animation-iteration-count: infinite` for decorative loops
- Reduced motion: always respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Dark / Light Surface Logic

| Context              | Background          | Text               | Border                        |
|----------------------|---------------------|--------------------|-------------------------------|
| Page (light)         | `--color-paper`     | `--color-ink`      | `--color-ink-12`              |
| Page (dark)          | `--color-ink`       | `--color-paper`    | `rgba(255,255,255,0.08)`      |
| Card on light        | `#FFFFFF`           | `--color-ink`      | `--color-ink-12`              |
| Card on dark         | `--color-onyx`      | `--color-paper`    | `rgba(255,255,255,0.06)`      |
| Accent section       | `--color-volt`      | `--color-ink`      | none                          |
| Secondary text       | —                   | `--color-ink-60`   | —                             |
| Disabled             | —                   | `--color-ink-30`   | —                             |

---

## 11. Prohibited Patterns

Never generate any of the following:

- Gradients (`linear-gradient`, `radial-gradient`) — anywhere
- `border-radius` above `8px`
- `border-radius: 50%` (circles)
- `box-shadow` with blur for decoration
- `text-shadow`
- Colors outside the token set
- Font families outside DM Sans / DM Mono
- Bounce or spring animations
- `font-style: italic` in UI (body copy only, sparingly)
- Uppercase `GORCEL` in wordmark contexts
- Volt as body text background

---

## 12. Tailwind Mapping (if used)

```js
// tailwind.config.js
module.exports = {
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
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        none: '0px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '40px',
        '8': '48px',
        '9': '64px',
        '10': '80px',
      },
      transitionTimingFunction: {
        DEFAULT: 'linear',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
}
```

---

*Gorcel Design Rules · v1.0 · Apply to all UI output without exception.*
