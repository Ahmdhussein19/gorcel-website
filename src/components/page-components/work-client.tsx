'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eyebrow, Lines, Reveal, Slot, Accordion, useSiteEffects, cx } from '@/lib/lib';
import { Nav, CtaBand as Cta, Footer as Foot } from '@/components/chrome';

const PROJECTS = [
  {
    n: '01',
    title: 'edv.app',
    desc: 'An investment management platform that replaced a portfolio-wide spreadsheet system with a single, owned application.',
    tags: ['Web Application', 'Dashboards', 'Automation'],
    role: 'Design · Engineering',
    stack: 'React · Node.js · PostgreSQL',
    slot: 'Investment dashboard',
  },
  {
    n: '02',
    title: 'Echo',
    desc: 'A customer portal and internal CRM for a subscription business — one system instead of three disconnected tools.',
    tags: ['Web Application', 'CRM', 'Portals'],
    role: 'Design · Engineering',
    stack: 'Next.js · Supabase',
    slot: 'Customer portal',
  },
];

const WORK_FAQ = [
  { q: 'Do you work with startups?', a: 'Yes. We work with businesses of all sizes, from early-stage startups to established companies.' },
  { q: 'Can you show me more case studies?', a: 'The best way to understand what we do is to tell us about your problem. We’ll show you relevant work and explain how we’d solve it.' },
  { q: 'Do you sign NDAs?', a: 'Yes. We can sign an NDA before any detailed discussion of your project.' },
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

export default function WorkClient() {
  const pathname = usePathname();
  useSiteEffects(pathname);

  return (
    <React.Fragment>
      <Nav />
      <PageHero
        eyebrow="Work"
        lines={['Software projects', 'built to be', <React.Fragment key="w">owned, not <em style={{ fontStyle: 'normal', color: '#C8F000' }}>rented</em>.</React.Fragment>]}
        sub="Every project below is a system the client owns outright — no license fees, no lock-in, no black boxes."
        markStyle={{ top: '-20%' }}
      />

      <section className="bg-paper sec-pad">
        <div className="wrap">
          <div className="proj-list">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.n} as="article" className={cx('proj', i % 2 === 1 && 'rev')}>
                <div className="proj-info">
                  <div className="proj-top">
                    <span className="mono-cap" style={{ color: 'rgba(13,13,13,.30)' }}>{p.n}</span>
                    {p.tags.map((t, j) => <span key={j} className="chip">{t}</span>)}
                  </div>
                  <h2 className="h2" style={{ marginTop: 20 }}>{p.title}</h2>
                  <p className="body dim-ink measure" style={{ marginTop: 18 }}>{p.desc}</p>
                  <dl className="proj-meta">
                    <div>
                      <dt className="mono-cap dim-ink">Role</dt>
                      <dd className="body">{p.role}</dd>
                    </div>
                    <div>
                      <dt className="mono-cap dim-ink">Stack</dt>
                      <dd className="body">{p.stack}</dd>
                    </div>
                    <div>
                      <dt className="mono-cap dim-ink">Outcome</dt>
                      <dd className="body">Fully owned by the client</dd>
                    </div>
                  </dl>
                </div>
                <Slot tag={p.slot} className="proj-media" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-onyx sec-pad">
        <div className="wrap faq-cols">
          <div>
            <Eyebrow style={{ marginBottom: 28 }}>Work FAQ</Eyebrow>
            <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '12ch' }}>Questions about our projects.</Reveal>
          </div>
          <Reveal><Accordion items={WORK_FAQ} /></Reveal>
        </div>
      </section>

      <Cta variant="volt" />
      <Foot />
    </React.Fragment>
  );
}
