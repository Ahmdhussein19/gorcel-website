'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eyebrow, Lines, Reveal, Slot, Chip, Accordion, useSiteEffects, cx } from '@/lib/lib';
import { Nav, CtaBand as Cta, Footer as Foot } from '@/components/chrome';

const SERVICE_BLOCKS = [
  { n: '01', t: 'Web Applications', p: 'The system your team lives in, or the product your customers use.', items: ['Internal dashboards and admin portals', 'Customer-facing platforms and SaaS', 'Tools that connect software you already pay for'], slot: 'Web app screenshot' },
  { n: '02', t: 'Mobile Apps', p: 'Your business in the hands of your team and customers.', items: ['iOS and Android apps', 'Offline-capable field-team apps', 'Customer apps tied to your systems'], slot: 'Mobile app screenshot' },
  { n: '03', t: 'Internal Systems & Automation', p: 'One system that does what your spreadsheets and manual steps do now.', items: ['Workflow and process automation', 'Inventory, operations, and CRM systems', 'ERP-class systems where the business needs one'], slot: 'System diagram' },
  { n: '04', t: 'Websites & E-commerce', p: 'Fast, search-ready sites that bring in customers.', items: ['Marketing websites', 'E-commerce stores'], slot: 'Website screenshot' },
  { n: '05', t: 'Digital Marketing', p: 'Get found by the people already searching for you.', items: ['SEO and local search', 'Paid ads and content'], slot: null },
];

const SERVICES_PROC = [
  { n: '01', t: 'Discovery', d: 'We map how your business works before writing code.' },
  { n: '02', t: 'Design', d: 'We plan the system around your workflow, not a template.' },
  { n: '03', t: 'Build', d: 'Short cycles. You see working software, not status reports.' },
  { n: '04', t: 'Launch', d: 'Structured handover with documentation and training.' },
  { n: '05', t: 'Support', d: 'Ongoing help if you want it. Your choice, never a trap.' },
];

const SERVICES_FAQ = [
  { q: "What's the difference between custom software and off-the-shelf tools?", a: 'Off-the-shelf software forces your business to adapt to it. Custom software is built around how you already work, so there are no workarounds.' },
  { q: 'Can you work with the software we already have?', a: 'Yes. We often build tools that connect and extend the systems you already pay for, instead of replacing everything.' },
  { q: 'Do you maintain it after launch?', a: 'If you want us to. Support is your choice — never a forced retainer.' },
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

const ProcessList: React.FC<{ steps: Array<{ n: string; t: string; d: string }> }> = ({ steps }) => (
  <div className="proc-list">
    {steps.map((s, i) => (
      <Reveal key={s.n} d={i as any} className="proc-row">
        <span className="proc-n mono">{s.n}</span>
        <span className="proc-t h3">{s.t}</span>
        <span className="proc-d small dim">{s.d}</span>
      </Reveal>
    ))}
  </div>
);

export default function ServicesClient() {
  const pathname = usePathname();
  useSiteEffects(pathname);

  return (
    <React.Fragment>
      <Nav />
      <PageHero
        eyebrow="Services"
        lines={['Software development', 'services built around', <React.Fragment key="w">how you <em style={{ fontStyle: 'normal', color: '#C8F000' }}>work</em>.</React.Fragment>]}
        sub="We don't pick a stack and force your business into it. We start with how you operate, then build the systems that fit."
        markStyle={{ top: '-20%' }}
      />

      <section className="bg-paper sec-pad">
        <div className="wrap svc-blocks">
          {SERVICE_BLOCKS.map((b, i) => (
            <Reveal key={b.n} as="article" className="svc-block" style={i === SERVICE_BLOCKS.length - 1 ? { borderBottom: 'none' } : undefined}>
              <div className="svc-block-l">
                <div className="mono-cap" style={{ color: 'rgba(13,13,13,.30)' }}>{b.n}</div>
                <h2 className="h2">{b.t}</h2>
                <p className="body dim-ink measure" style={{ marginTop: 18 }}>{b.p}</p>
              </div>
              <div className="svc-block-r">
                <ul className="feat-list">
                  {b.items.map((it, j) => (<li key={j}><span className="sq" />{it}</li>))}
                </ul>
                {b.slot ? <Slot tag={b.slot} style={{ aspectRatio: '16 / 8', marginTop: 32 }} /> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 28 }}>How we work</Eyebrow>
          <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '16ch', marginBottom: 72 }}>Five stages, from first conversation to launch and beyond.</Reveal>
          <ProcessList steps={SERVICES_PROC} />
        </div>
      </section>

      <section className="bg-bone sec-pad">
        <div className="wrap faq-cols">
          <div>
            <Eyebrow style={{ marginBottom: 28 }}>Services FAQ</Eyebrow>
            <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '12ch' }}>The questions we hear most.</Reveal>
          </div>
          <Reveal><Accordion items={SERVICES_FAQ} /></Reveal>
        </div>
      </section>

      <Cta variant="volt" />
      <Foot />
    </React.Fragment>
  );
}
