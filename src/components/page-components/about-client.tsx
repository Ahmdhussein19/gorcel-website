'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eyebrow, Lines, Reveal, Accordion, useSiteEffects } from '@/lib/lib';
import { Nav, CtaBand as Cta, Footer as Foot } from '@/components/chrome';

const STANDS = [
  { n: '01', t: 'Fixed scope, fixed price', d: 'We agree on exactly what we will build and how much it will cost before any work starts. No surprises, no scope-creep invoices.' },
  { n: '02', t: 'You own everything', d: 'Full source code, full rights. No lock-in, no license fees on your own software. Run it, extend it, or hand it to anyone you choose.' },
  { n: '03', t: 'Working software, not promises', d: 'You see real, working software at the end of every cycle. Not slides, not wireframes, not status reports — product you can test and challenge.' },
  { n: '04', t: 'No sales calls', d: 'We reply to every brief within one business day with a clear proposal. No sales meetings, no jargon, no pressure.' },
];

const ABOUT_FAQ = [
  { q: 'Where are you based?', a: 'Cairo, Egypt. We work with businesses across MENA and beyond, remotely and on-site.' },
  { q: 'How long have you been doing this?', a: 'Gorcel was founded in 2025. The team has years of experience building software for businesses across industries.' },
  { q: 'Do you work with non-technical founders?', a: 'Yes. We translate business problems into technical solutions. You don’t need to know how to code to work with us.' },
];

const PageHero: React.FC<{ eyebrow: string; lines: any[]; sub?: any; minimal?: boolean; markStyle?: React.CSSProperties; padTop?: number; tall?: boolean; display?: boolean }> = ({ eyebrow, lines, sub, padTop = 188, tall, markStyle }) => (
  <header className="bg-ink" style={{ overflow: 'hidden', position: 'relative', minHeight: tall ? '84svh' : undefined, display: tall ? 'flex' : undefined, alignItems: tall ? 'flex-end' : undefined }}>
    <div data-par="0.1" style={{ position: 'absolute', top: '-20%', right: '-3%', width: 'min(50vw,650px)', opacity: 0.05, pointerEvents: 'none', ...markStyle }}>
      <img src="/assets/gorcel-mark-angular-light.svg" alt="Gorcel logo mark" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div className="wrap" style={{ padding: `${padTop}px 0 ${tall ? 80 : 96}px` }}>
      <Eyebrow style={{ marginBottom: 32 }}>{eyebrow}</Eyebrow>
      <Lines className={tall ? 'display' : 'h1'} style={{ maxWidth: '18ch' }} lines={lines} />
      {sub ? <Reveal d={2} as="p" className="lead dim measure" style={{ marginTop: 36 }}>{sub}</Reveal> : null}
    </div>
  </header>
);

export default function AboutClient() {
  const pathname = usePathname();
  useSiteEffects(pathname);

  return (
    <React.Fragment>
      <Nav />
      <PageHero
        eyebrow="About"
        lines={['A software partner,', 'not a vendor.', <React.Fragment key="w">Built for <em style={{ fontStyle: 'normal', color: '#C8F000' }}>ownership</em>.</React.Fragment>]}
        sub="Most software firms optimize for their own revenue. We optimize for your ownership — fixed cost, full rights, no lock-in."
        markStyle={{ top: '-20%' }}
      />

      <section className="bg-paper sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 28 }}>What we stand for</Eyebrow>
          <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '16ch', marginBottom: 72 }}>Four principles that guide every project.</Reveal>
          <div className="stand-grid">
            {STANDS.map((s, i) => (
              <Reveal key={s.n} d={i as any} className="stand">
                <div className="mono-cap">{s.n}</div>
                <h3 className="h3">{s.t}</h3>
                <p className="small dim-ink">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 28 }}>Cairo, Egypt</Eyebrow>
          <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '14ch', marginBottom: 48 }}>Built in MENA, for businesses everywhere.</Reveal>
          <Reveal d={2} as="p" className="lead dim-ink measure">
            Cairo is one of the fastest-growing tech ecosystems in the world. We build from here, but we work across MENA and beyond — remotely and on-site.
          </Reveal>
          <div className="cairo-meta">
            <Reveal className="stat"><div className="stat-num">2025</div><div className="mono-cap dim-ink">Founded</div></Reveal>
            <Reveal d={1} className="stat"><div className="stat-num">Cairo</div><div className="mono-cap dim-ink">HQ</div></Reveal>
            <Reveal d={2} className="stat"><div className="stat-num">MENA</div><div className="mono-cap dim-ink">Primary market</div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-onyx sec-pad">
        <div className="wrap faq-cols">
          <div>
            <Eyebrow style={{ marginBottom: 28 }}>About FAQ</Eyebrow>
            <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '12ch' }}>Questions about Gorcel.</Reveal>
          </div>
          <Reveal><Accordion items={ABOUT_FAQ} /></Reveal>
        </div>
      </section>

      <Cta variant="volt" />
      <Foot />
    </React.Fragment>
  );
}
