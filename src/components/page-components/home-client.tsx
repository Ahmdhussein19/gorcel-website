'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eyebrow, Lines, Reveal, Marquee, Accordion, Slot, Chip, useSiteEffects, cx } from '@/lib/lib';
import { Nav, CtaBand, Footer } from '@/components/chrome';
import { WovenLightHero } from '@/components/ui/woven-light-hero';

const HOME_FAQ = [
  { q: 'How do I know if I need custom software?', a: "If your team relies on spreadsheets and manual steps to fill gaps your current tools leave, you've likely outgrown off-the-shelf software. That's the point custom software pays off." },
  { q: 'How much does it cost?', a: 'We agree on a fixed price before any work starts, so you know the cost upfront. Request a quote for a clear number.' },
  { q: 'How long does it take?', a: 'Most projects deliver working software within weeks, because we build in short cycles. The timeline is fixed during discovery.' },
  { q: 'Do I own the software?', a: 'Yes — full source code, full rights, no lock-in, no recurring license fees.' },
  { q: 'Do you work with businesses outside Egypt?', a: 'Yes. We work across MENA and beyond, remotely and on-site.' },
];

const SERVICES_STRIP = ['Web Applications', 'Mobile Apps', 'Internal Systems', 'Automation', 'E-commerce', 'Digital Marketing'];

const PROC = [
  { n: '01', t: 'Discovery', d: 'We map how your business works before writing code — the real problem, not just the stated one.' },
  { n: '02', t: 'Design', d: 'We plan the system around your workflow, not a template. Systems logic first, interface second.' },
  { n: '03', t: 'Build', d: 'Short cycles. You see working software, not status reports. No black boxes.' },
  { n: '04', t: 'Launch', d: "Structured handover with documentation and training. We don't disappear at go-live." },
  { n: '05', t: 'Support', d: 'Ongoing help if you want it. On your terms — never a forced retainer.' },
];

const HeroSwitch: React.FC<{ variant: string; onSet: (v: string) => void }> = ({ variant, onSet }) => (
  <div
    style={{
      position: 'fixed', right: 18, bottom: 18, zIndex: 150, display: 'flex', alignItems: 'center', gap: 8,
      background: 'rgba(30,30,30,.9)', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(245,245,242,.10)', borderRadius: 3, padding: '7px 8px',
    }}
  >
    <span className="mono-cap" style={{ color: 'rgba(245,245,242,.30)', paddingLeft: 4 }}>Hero</span>
    {['a', 'b'].map((v) => (
      <button key={v} className={cx('hsw', variant === v && 'on')} onClick={() => onSet(v)}>
        {v.toUpperCase()}
      </button>
    ))}
  </div>
);

export default function HomeClient() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<string>(
    (typeof localStorage !== 'undefined' && localStorage.getItem('gorcel-hero')) || 'a'
  );
  const setHero = (v: string) => {
    setVariant(v);
    try { localStorage.setItem('gorcel-hero', v); } catch (e) {}
  };

  useSiteEffects(pathname);

  // reveal the freshly-shown hero
  useEffect(() => {
    const active = document.querySelector(`[data-hero-variant="${variant}"]`);
    if (active) {
      requestAnimationFrame(() =>
        active.querySelectorAll('[data-rv], .lines').forEach((el) => el.classList.add('in'))
      );
    }
  }, [variant]);

  return (
    <React.Fragment>
      <Nav />
      
      {/* ===== HERO ===== */}
      <header className="bg-ink" style={{ position: 'relative', overflow: 'hidden' }}>
        <WovenLightHero />
        {/* Variant A */}
        <section
          data-hero-variant="a"
          className="wrap"
          style={{ minHeight: '100svh', display: variant === 'a' ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'flex-end', padding: '108px 0 52px', position: 'relative' }}
        >
          <div style={{ marginBottom: 'auto' }} />
          <Eyebrow style={{ marginBottom: 28 }}>Custom software · Cairo · MENA</Eyebrow>
          <Lines
            className="display"
            style={{ maxWidth: '14ch' }}
            lines={[
              'Software your',
              'business runs on.',
              'Built around how',
              <React.Fragment key="a">you <em style={{ fontStyle: 'normal', color: '#C8F000' }}>actually</em> work.</React.Fragment>,
            ]}
          />
          <div className="row between wrapflex" style={{ gap: 40, alignItems: 'flex-end', marginTop: 40 }}>
            <Reveal d={2} as="p" className="lead dim measure" style={{ maxWidth: '42ch' }}>
              Web and mobile software for businesses held back by disconnected tools and manual work — at a fixed price, fully owned by you. From discovery to deployment.
            </Reveal>
            <Reveal d={3} className="row gap-s wrapflex" style={{ flex: 'none' }}>
              <Link href="/contact" className="btn btn-volt">Get a fixed quote <span className="arw">→</span></Link>
              <Link href="/services" className="btn btn-ghost">See what we build</Link>
            </Reveal>
          </div>
          <Reveal d={4} className="row between" style={{ marginTop: 44, alignItems: 'center', borderTop: '1px solid rgba(245,245,242,.10)', paddingTop: 18 }}>
            <span className="mono-cap dim">Scroll to read</span>
            <span className="mono-cap dim">30.0444° N · 31.2357° E</span>
          </Reveal>
        </section>

        {/* Variant B */}
        <section
          data-hero-variant="b"
          className="wrap"
          style={{ minHeight: '100svh', display: variant === 'b' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 0 80px', position: 'relative' }}
        >
          <Eyebrow center nowrap style={{ marginBottom: 40 }}>A software partner, not a vendor</Eyebrow>
          <Lines
            className="display"
            style={{ maxWidth: '16ch', position: 'relative' }}
            lines={[
              'When your tools',
              'stop keeping up,',
              'we build the',
              <React.Fragment key="b">system that <em style={{ fontStyle: 'normal', color: '#C8F000' }}>does</em>.</React.Fragment>,
            ]}
          />
          <Reveal d={2} as="p" className="lead dim" style={{ maxWidth: '52ch', margin: '40px auto 0' }}>
            Custom systems, web and mobile products — built around how your business actually operates. Fixed cost, agreed before we start. You own everything when we're done.
          </Reveal>
          <Reveal d={3} className="row gap-s" style={{ marginTop: 48, justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-volt">Get a fixed quote <span className="arw">→</span></Link>
            <Link href="/work" className="btn btn-ghost">See our work</Link>
          </Reveal>
          <Reveal d={4} className="row gap-l" style={{ marginTop: 72, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="mono-cap dim">Est. 2025</span>
            <span className="mono-cap dim">Cairo, Egypt</span>
            <span className="mono-cap dim">MENA · Europe · Beyond</span>
          </Reveal>
        </section>
      </header>

      <HeroSwitch variant={variant} onSet={setHero} />

      {/* ===== MARQUEE STRIP ===== */}
      <div className="bg-volt" style={{ borderTop: '1px solid #0D0D0D', borderBottom: '1px solid #0D0D0D', padding: '16px 0' }}>
        <Marquee noMask durationSec={34}>
          {SERVICES_STRIP.map((s, i) => (
            <React.Fragment key={i}>
              <span className="mq-item h4" style={{ padding: '0 28px' }}>{s}</span>
              <span className="mq-item">◆</span>
            </React.Fragment>
          ))}
        </Marquee>
      </div>

      {/* ===== MISSION ===== */}
      <section className="bg-paper sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 48 }}>01 — Our position</Eyebrow>
          <Lines
            className="h1"
            style={{ maxWidth: '20ch' }}
            lines={[
              "We don't build software to",
              'impress you. We build the',
              'system that removes the friction',
              'between your business and how',
              <React.Fragment key="c">it <em style={{ fontStyle: 'normal', color: '#0D0D0D', textDecoration: 'underline', textDecorationColor: '#C8F000', textDecorationThickness: 4, textUnderlineOffset: 8 }}>should</em> run.</React.Fragment>,
            ]}
          />
          <div className="row between wrapflex" style={{ gap: 40, marginTop: 72, alignItems: 'flex-end' }}>
            <Reveal d={1} as="p" className="lead dim-ink measure">
              Most businesses don't fail at software — they outgrow it. The tools that worked at the start now need spreadsheets, manual steps, and copy-paste to hold together. We start from how you work, then build around it.
            </Reveal>
            <Link href="/about" data-rv data-rv-d="2" className="tlink">Read our approach <span className="arw">→</span></Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES BENTO ===== */}
      <section id="services" className="bg-ink sec-pad">
        <div className="wrap">
          <div className="row between wrapflex" style={{ gap: 24, alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <Eyebrow style={{ marginBottom: 28 }}>02 — What we build</Eyebrow>
              <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '16ch' }}>Every layer your business runs on. Owned by you.</Reveal>
            </div>
            <Reveal d={2} as="span" className="mono-cap dim">05 service lines</Reveal>
          </div>

          <div className="bento">
            <Link href="/services" className="bento-cell feat">
              <div className="bento-top">
                <span className="bento-num mono">01</span>
                <span className="svc-tags"><Chip>SaaS</Chip><Chip>Portals</Chip><Chip>Dashboards</Chip></span>
              </div>
              <h3 className="h2" style={{ marginTop: 20 }}>Web Applications</h3>
              <p className="body dim measure-sm" style={{ marginTop: 14 }}>The system your team works in, or the product your customers use — designed, engineered and launched end to end.</p>
              <Slot tag="Dashboard UI" className="bento-slot" />
              <span className="bento-arw" aria-hidden="true">→</span>
            </Link>

            <Link href="/services" className="bento-cell">
              <div className="bento-top"><span className="bento-num mono">02</span><span className="svc-tags"><Chip>iOS</Chip><Chip>Android</Chip></span></div>
              <h3 className="h3" style={{ marginTop: 'auto' }}>Mobile Apps</h3>
              <p className="small dim" style={{ marginTop: 10 }}>iOS and Android, for your team and your customers — yours to own.</p>
              <span className="bento-arw" aria-hidden="true">→</span>
            </Link>

            <Link href="/services" className="bento-cell">
              <div className="bento-top"><span className="bento-num mono">03</span><span className="svc-tags"><Chip>ERP</Chip><Chip>CRM</Chip><Chip>Workflow</Chip></span></div>
              <h3 className="h3" style={{ marginTop: 'auto' }}>Internal Systems &amp; Automation</h3>
              <p className="small dim" style={{ marginTop: 10 }}>One system instead of scattered spreadsheets and manual steps.</p>
              <span className="bento-arw" aria-hidden="true">→</span>
            </Link>

            <Link href="/services" className="bento-cell">
              <div className="bento-top"><span className="bento-num mono">04</span><span className="svc-tags"><Chip>Marketing</Chip><Chip>Stores</Chip></span></div>
              <h3 className="h3" style={{ marginTop: 'auto' }}>Websites &amp; E-commerce</h3>
              <p className="small dim" style={{ marginTop: 10 }}>Fast, search-ready sites and stores that bring in customers.</p>
              <span className="bento-arw" aria-hidden="true">→</span>
            </Link>

            <Link href="/services" className="bento-cell">
              <div className="bento-top"><span className="bento-num mono">05</span><span className="svc-tags"><Chip>SEO</Chip><Chip>Paid</Chip><Chip>Content</Chip></span></div>
              <h3 className="h3" style={{ marginTop: 'auto' }}>Digital Marketing</h3>
              <p className="small dim" style={{ marginTop: 10 }}>Get found by the customers already searching for you.</p>
              <span className="bento-arw" aria-hidden="true">→</span>
            </Link>

            <div className="bento-cell accent">
              <div className="stat-num" style={{ fontSize: 'clamp(40px,4vw,64px)' }}>100%</div>
              <div className="h4" style={{ marginTop: 8 }}>Yours to own.</div>
              <p className="small" style={{ marginTop: 10, color: 'rgba(13,13,13,.60)' }}>Full source code, full rights. No lock-in, no license fees on your own software.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE + STATS ===== */}
      <section className="bg-bone sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 28 }}>03 — Why businesses choose Gorcel</Eyebrow>
          <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '18ch', marginBottom: 72 }}>Most software firms optimize for their own revenue. We optimize for your ownership.</Reveal>
          <div className="why-grid">
            {[
              { n: '01', t: 'You know the cost before we start', d: 'Fixed scope and price, agreed upfront. No scope-creep invoices, no surprises. You know the number before a line of code is written.' },
              { n: '02', t: 'You own everything we build', d: 'Full source code and rights. No lock-in, no license fees on your own software. To run, extend, or hand to anyone you choose.' },
              { n: '03', t: 'You see progress, not promises', d: 'Real, working software at the end of every cycle. Not slides, not wireframes, not status reports — product you can test and challenge.' },
            ].map((c, i) => (
              <Reveal key={c.n} d={(i as 0 | 1 | 2) as any} className="why-card">
                <div className="why-n mono">{c.n}</div>
                <h3 className="h3">{c.t}</h3>
                <p className="small dim-ink">{c.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="stat-band">
            <Reveal className="stat"><div className="stat-num"><span data-count="100" data-suffix="%">0%</span></div><div className="mono-cap dim-ink">Code ownership</div></Reveal>
            <Reveal d={1} className="stat"><div className="stat-num"><span data-count="0">0</span></div><div className="mono-cap dim-ink">License lock-in</div></Reveal>
            <Reveal d={2} className="stat"><div className="stat-num">Fixed</div><div className="mono-cap dim-ink">Scope &amp; cost, upfront</div></Reveal>
            <Reveal d={3} className="stat"><div className="stat-num"><span data-count="1" data-suffix="-day">0-day</span></div><div className="mono-cap dim-ink">Reply to every brief</div></Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="bg-ink sec-pad">
        <div className="wrap">
          <Eyebrow style={{ marginBottom: 28 }}>04 — How we work</Eyebrow>
          <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '14ch', marginBottom: 72 }}>From the problem to the product. Five stages.</Reveal>
          <div className="proc-list">
            {PROC.map((s, i) => (
              <Reveal key={s.n} d={(i as any)} className="proc-row">
                <span className="proc-n mono">{s.n}</span>
                <span className="proc-t h3">{s.t}</span>
                <span className="proc-d small dim">{s.d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-paper sec-pad">
        <div className="wrap">
          <div className="row between wrapflex" style={{ gap: 24, alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <Eyebrow style={{ marginBottom: 28 }}>05 — In their words</Eyebrow>
              <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '16ch' }}>Partners who stopped renting their own systems.</Reveal>
            </div>
          </div>
          <div className="tst-grid">
            <Reveal as="figure" className="tst">
              <div className="mono-cap" style={{ color: '#0D0D0D', marginBottom: 24 }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, background: '#C8F000', marginRight: 10 }} />Investment firm · edv.app
              </div>
              <blockquote className="h3" style={{ fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.32 }}>"We were running a portfolio on spreadsheets. Gorcel replaced all of it with one system we actually own — and we knew the cost before they started."</blockquote>
              <figcaption className="small dim-ink" style={{ marginTop: 28 }}>Operations Director · Programs &amp; investments</figcaption>
            </Reveal>
            <Reveal d={1} as="figure" className="tst">
              <div className="mono-cap" style={{ marginBottom: 24, color: 'rgba(13,13,13,.40)' }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, background: '#C8F000', marginRight: 10 }} />Founder · Echo
              </div>
              <blockquote className="h3" style={{ fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.32 }}>"No sales calls, no jargon. They told us what they'd build, what it would cost, and shipped working software every cycle."</blockquote>
              <figcaption className="small dim-ink" style={{ marginTop: 28 }}>Founder · Echo</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-onyx sec-pad">
        <div className="wrap faq-cols">
          <div>
            <Eyebrow style={{ marginBottom: 28 }}>06 — FAQ</Eyebrow>
            <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '12ch' }}>Questions, answered straight.</Reveal>
            <Reveal d={2} as="p" className="small dim" style={{ marginTop: 24, maxWidth: '34ch' }}>Still unsure if custom software is right for you? Tell us what's slowing you down.</Reveal>
            <Link href="/contact" data-rv data-rv-d="3" className="btn btn-volt" style={{ marginTop: 28 }}>Get a fixed quote <span className="arw">→</span></Link>
          </div>
          <Reveal><Accordion items={HOME_FAQ} /></Reveal>
        </div>
      </section>

      <CtaBand variant="volt" />
      <Footer />
    </React.Fragment>
  );
}
