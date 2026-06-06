'use client';

import { useState, useEffect } from 'react';

type RNode = React.ReactNode;
type CSS = React.CSSProperties;

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Lenis weighted smooth scroll (init once) ---------- */
export function useLenis(): void {
  useEffect(() => {
    if (prefersReducedMotion() || typeof (window as any).Lenis === 'undefined') return;
    const Lenis = (window as any).Lenis;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.09,
      touchMultiplier: 1.4,
    });
    (window as any).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const nav = document.querySelector('.nav');
    const parEls = Array.from(document.querySelectorAll<HTMLElement>('[data-par]'));
    const onScroll = (y: number) => {
      if (nav) nav.classList.toggle('scrolled', y > 40);
      if (!prefersReducedMotion()) {
        for (const el of parEls) {
          const speed = parseFloat(el.dataset.par || '0.1');
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          el.style.transform = `translate3d(0,${(-center * speed).toFixed(1)}px,0)`;
        }
      }
    };
    lenis.on('scroll', (e: any) => onScroll(e.scroll));
    onScroll(0);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as any).__lenis = undefined;
    };
  }, []);
}

/* ---------- smooth-scroll a hash target ---------- */
export function scrollToHash(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top +
    ((window as any).__lenis ? (window as any).__lenis.scroll : window.scrollY) -
    12;
  if ((window as any).__lenis) (window as any).__lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: 'smooth' });
}

/* ---------- reveal + counters + parallax scanner ---------- */
export function useSiteEffects(key: string): void {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    // reveals
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('[data-rv], .lines').forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el);
    });

    // counters
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          cio.unobserve(en.target);
          const el = en.target as HTMLElement;
          const to = parseFloat(el.dataset.count || '0');
          const suf = el.dataset.suffix || '';
          const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
          if (reduce) {
            el.textContent = to.toFixed(dec) + suf;
            return;
          }
          const dur = 1400;
          let t0 = 0;
          const step = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min(1, (ts - t0) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = (to * e).toFixed(dec) + suf;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = to.toFixed(dec) + suf;
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [key]);
}

/* ---------- primitives ---------- */

interface EyebrowProps { children: RNode; center?: boolean; nowrap?: boolean; style?: CSS; }
export const Eyebrow: React.FC<EyebrowProps> = ({ children, center, nowrap, style }) => (
  <div
    data-rv
    className="eyebrow"
    style={{
      justifyContent: center ? 'center' : undefined,
      whiteSpace: nowrap ? 'nowrap' : undefined,
      ...style,
    }}
  >
    <span className="sq" />
    {' '}
    {children}
  </div>
);

/* Animated line-by-line wipe heading. */
interface LinesProps { lines: RNode[]; className?: string; style?: CSS; }
export const Lines: React.FC<LinesProps> = ({ lines, className, style }) => (
  <h1 className={cx('lines', className)} style={style}>
    {lines.map((ln, i) => (
      <span className="ln" key={i}>
        <span>{ln}</span>
      </span>
    ))}
  </h1>
);

interface RevealProps {
  children: RNode;
  d?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: CSS;
  as?: any;
}
export const Reveal: React.FC<RevealProps> = ({ children, d, className, style, as }) => {
  const Tag = as || 'div';
  return (
    <Tag data-rv data-rv-d={d} className={className} style={style}>
      {children}
    </Tag>
  );
};

/* Marquee that duplicates its track for a seamless loop. */
interface MarqueeProps { children: RNode; durationSec?: number; noMask?: boolean; reverse?: boolean; className?: string; trackClassName?: string; style?: CSS; }
export const Marquee: React.FC<MarqueeProps> = ({ children, durationSec = 32, noMask, reverse, className, trackClassName, style }) => (
  <div
    className={cx('marquee', noMask && 'no-mask', reverse && 'rev', className)}
    style={{ ['--mq-dur' as any]: `${durationSec}s`, ...style } as CSS}
  >
    <div className={cx('marquee__track', trackClassName)}>{children}</div>
    <div className={cx('marquee__track', trackClassName)} aria-hidden="true">{children}</div>
  </div>
);

/* Accordion */
interface AccItem { q: RNode; a: RNode; }
interface AccordionProps { items: AccItem[]; className?: string; }
export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={cx('faq', className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const num = String(i + 1).padStart(2, '0');
        return (
          <div className={cx('acc-item', isOpen && 'open')} key={i}>
            <button className="acc-head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen ? 'true' : 'false'}>
              <span className="acc-q">
                <span className="num">{num}</span>
                <span className="h4">{it.q}</span>
              </span>
              <span className="acc-icon" />
            </button>
            <div className="acc-panel" style={{ height: isOpen ? 'auto' : 0 }}>
              <div className="acc-panel-inner small dim">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* placeholder image slot */
interface SlotProps { tag: string; className?: string; style?: CSS; }
export const Slot: React.FC<SlotProps> = ({ tag, className, style }) => (
  <div className={cx('slot', className)} style={style}>
    <span className="slot-tag">{tag}</span>
  </div>
);

export const Chip: React.FC<{ children: RNode }> = ({ children }) => <span className="chip">{children}</span>;

export const ArrowBtn = ({ children, href, className }: { children: RNode; href: string; className?: string }) => (
  <a href={href} className={className}>
    {children} <span className="arw">→</span>
  </a>
);
