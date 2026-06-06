'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eyebrow, Lines, Reveal, Accordion, useSiteEffects } from '@/lib/lib';
import { Nav, CtaBand as Cta, Footer as Foot } from '@/components/chrome';

const CONTACT_FAQ = [
  { q: 'How quickly do you reply?', a: 'We reply to every brief within one business day with a clear proposal or follow-up questions.' },
  { q: 'Do you sign NDAs?', a: 'Yes. We can sign an NDA before any detailed discussion of your project.' },
  { q: 'What happens after I submit the form?', a: 'You’ll hear from us within one business day. We’ll either send a proposal or ask a few clarifying questions.' },
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

export default function ContactClient() {
  const pathname = usePathname();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  useSiteEffects(pathname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate form submission
    setTimeout(() => {
      setFormState('ok');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1500);
  };

  return (
    <React.Fragment>
      <Nav />
      <PageHero
        eyebrow="Contact"
        lines={['Tell us what', <React.Fragment key="w">slows your <em style={{ fontStyle: 'normal', color: '#C8F000' }}>business</em>.</React.Fragment>, 'Get a fixed quote.']}
        sub="We reply to every brief within one business day with a clear proposal. No sales calls, no jargon."
        markStyle={{ top: '-20%' }}
      />

      <section className="bg-onyx">
        <div className="contact-split">
          <div className="contact-side">
            <div>
              <Eyebrow style={{ marginBottom: 28 }}>Get in touch</Eyebrow>
              <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '14ch', marginBottom: 48 }}>Tell us what you need. We’ll tell you what it costs.</Reveal>
              <div className="contact-line">
                <span className="mono-cap dim" style={{ display: 'block', marginBottom: 8 }}>Email</span>
                <a href="mailto:hello@gorcel.com" className="h4">hello@gorcel.com</a>
              </div>
              <div className="contact-line" style={{ marginTop: 32 }}>
                <span className="mono-cap dim" style={{ display: 'block', marginBottom: 8 }}>Location</span>
                <span className="h4">Cairo, Egypt</span>
              </div>
              <div className="contact-line" style={{ marginTop: 32 }}>
                <span className="mono-cap dim" style={{ display: 'block', marginBottom: 8 }}>Social</span>
                <a href="https://www.linkedin.com" className="h4">LinkedIn ↗</a>
              </div>
            </div>
            <div className="next-box">
              <span className="mono-cap dim" style={{ display: 'block', marginBottom: 12 }}>What happens next</span>
              <p className="small dim">We reply within one business day with a clear proposal or follow-up questions. No sales calls.</p>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="mono-cap">Name</label>
                <input
                  type="text"
                  className="inp"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="field two">
                <div>
                  <label className="mono-cap">Email</label>
                  <input
                    type="email"
                    className="inp"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mono-cap">Company (optional)</label>
                  <input
                    type="text"
                    className="inp"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label className="mono-cap">Message</label>
                <textarea
                  className="inp"
                  placeholder="Tell us about your project or problem..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="submit"
                data-state={formState}
                disabled={formState === 'sending' || formState === 'ok'}
              >
                {formState === 'idle' && 'Send message →'}
                {formState === 'sending' && 'Sending...'}
                {formState === 'ok' && 'Message sent ✓'}
                {formState === 'err' && 'Try again'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-bone sec-pad">
        <div className="wrap faq-cols">
          <div>
            <Eyebrow style={{ marginBottom: 28 }}>Contact FAQ</Eyebrow>
            <Reveal d={1} as="h2" className="h2" style={{ maxWidth: '12ch' }}>Questions about getting in touch.</Reveal>
          </div>
          <Reveal><Accordion items={CONTACT_FAQ} /></Reveal>
        </div>
      </section>

      <Cta variant="ink" />
      <Foot />
    </React.Fragment>
  );
}
