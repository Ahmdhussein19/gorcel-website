export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gorcel",
  url: "https://gorcel.com",
  description:
    "Custom software development company in Cairo, serving businesses across MENA.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  areaServed: "MENA",
  email: "hello@gorcel.com",
  sameAs: [],
} as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if I need custom software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your team relies on spreadsheets and manual steps to fill gaps your current tools leave, you've likely outgrown off-the-shelf software. That's the point custom software pays off.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We agree on a fixed price before any work starts, so you know the cost upfront. Request a quote for a clear number.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects deliver working software within weeks, because we build in short cycles. The timeline is fixed during discovery.",
      },
    },
    {
      "@type": "Question",
      name: "Do I own the software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — full source code, full rights, no lock-in, no recurring license fees.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with businesses outside Egypt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work across MENA and beyond, remotely and on-site.",
      },
    },
  ],
} as const;
