'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx, Marquee } from '@/lib/lib';

const NAV_ITEMS: Array<{ label: string; to: string }> = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Brand: React.FC<{ markSize?: number; wordH?: number; style?: React.CSSProperties }> = ({
  markSize = 26,
  wordH = 17,
  style,
}) => (
  <Link href="/" className="nav-brand" aria-label="Gorcel home" style={style}>
    <img className="mk" src="/assets/gorcel-mark-angular-light.svg" alt="" style={{ width: markSize, height: markSize }} />
    <img className="wd" src="/assets/word-light.svg" alt="Gorcel" style={{ height: wordH }} />
  </Link>
);

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    if (open) {
      (window as any).__lenis && (window as any).__lenis.stop();
    } else {
      (window as any).__lenis && (window as any).__lenis.start();
    }
  }, [open]);

  React.useEffect(() => {
    const lenis = (window as any).__lenis;
    
    const handleScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      setScrolled(scrollY > 50);
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    
    handleScroll();
    
    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <nav className={cx('nav', scrolled && 'scrolled')}>
        <div className="nav-inner">
          <Brand />
          <div className="nav-links">
            {NAV_ITEMS.map((it) => (
              <Link key={it.to} href={it.to} className={cx('nav-link', pathname === it.to && 'active')}>
                {it.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <Link href="/contact" className="btn btn-volt">
              Get a fixed quote <span className="arw">→</span>
            </Link>
            <button
              className={cx('nav-burger', open && 'on')}
              aria-label="Menu"
              onClick={() => setOpen((v: boolean) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={cx('sheet', open && 'open')}>
        <div className="col" style={{ gap: 6 }}>
          {NAV_ITEMS.map((it, i) => (
            <Link key={it.to} href={it.to} onClick={() => setOpen(false)}>
              <span className="i">{String(i + 1).padStart(2, '0')}</span>
              {it.label}
            </Link>
          ))}
        </div>
        <div className="sheet-foot mono-cap dim">hello@gorcel.com&nbsp;&nbsp;·&nbsp;&nbsp;Cairo, Egypt</div>
      </div>
    </React.Fragment>
  );
};

interface CtaBandProps { variant?: 'volt' | 'ink'; }
export const CtaBand: React.FC<CtaBandProps> = ({ variant = 'volt' }) => {
  const dark = variant === 'ink';
  return (
    <section className={cx('sec-pad-sm', dark ? 'bg-onyx' : 'bg-volt')} style={dark ? { borderTop: '1px solid var(--line-dark)' } : undefined}>
      <div className="wrap row between center wrapflex" style={{ gap: 32 }}>
        <h2 data-rv className="h2" style={{ maxWidth: '20ch' }}>
          Tell us what's slowing your business down — get a fixed quote, no sales calls.
        </h2>
        <Link href="/contact" data-rv data-rv-d="1" className={cx('btn', dark ? 'btn-volt' : 'btn-ink')} style={{ flex: 'none' }}>
          Get a fixed quote <span className="arw">→</span>
        </Link>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-ink" style={{ paddingTop: 80, overflow: 'hidden', borderTop: '1px solid var(--line-dark)' }}>
    <Marquee durationSec={40} trackClassName="foot-marquee" style={{ marginBottom: 72 }}>
      <span className="mq-item" style={{ padding: '0 .25em' }}>Built to own</span>
      <span className="mq-item dot" style={{ padding: '0 .2em' }}>◆</span>
      <span className="mq-item" style={{ padding: '0 .25em' }}>Fixed scope</span>
      <span className="mq-item dot" style={{ padding: '0 .2em' }}>◆</span>
    </Marquee>
    <div className="wrap">
      <div className="foot-grid">
        <div className="foot-brand">
          <Brand markSize={30} wordH={19} style={{ marginBottom: 24 }} />
          <p className="small dim measure-sm">Custom software your business owns outright. Built around how you actually work.</p>
        </div>
        <nav className="foot-col">
          <span className="mono-cap dim" style={{ color: 'var(--paper-30)' }}>Pages</span>
          {NAV_ITEMS.map((it) => (
            <Link key={it.to} href={it.to}>{it.label}</Link>
          ))}
        </nav>
        <div className="foot-col">
          <span className="mono-cap dim" style={{ color: 'var(--paper-30)' }}>Contact</span>
          <Link href="mailto:hello@gorcel.com">hello@gorcel.com</Link>
          <span className="dim">Cairo, Egypt</span>
          <span className="dim">MENA · Europe · Beyond</span>
          <Link href="https://www.linkedin.com">LinkedIn ↗</Link>
        </div>
      </div>
      <div className="foot-base">
        <span className="mono-cap dim" style={{ color: 'var(--paper-30)' }}>© {new Date().getFullYear()} Gorcel — Cairo, Egypt</span>
        <span className="mono-cap dim" style={{ color: 'var(--paper-30)' }}>A software partner, not a vendor</span>
      </div>
    </div>
  </footer>
);

export { Brand, NAV_ITEMS };
