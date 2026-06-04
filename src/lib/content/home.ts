export const homeContent = {
  meta: {
    title: "Custom Software Development in MENA | Gorcel",
    description:
      "When your tools don't connect and manual work slows you down, Gorcel builds software that fits how your business runs. Fixed cost, full ownership. Cairo-based, serving MENA.",
  },
  hero: {
    eyebrow: "Custom software development · Cairo · Serving MENA",
    h1: "When your tools stop keeping up, we build the system that does",
    body: "Web and mobile software for businesses held back by disconnected tools and manual work — at a fixed price, fully owned by you.",
    bullets: [
      "Fixed cost — agreed before we start",
      "Full ownership — no lock-in",
      "Working software every cycle",
    ],
    cta: {
      primary: { label: "Get a fixed quote", href: "/contact" as const },
      secondary: { label: "See what we build", href: "/work" as const },
    },
  },
  problem: {
    h2: "You've outgrown your tools. The workarounds are the proof.",
    intro:
      "Most businesses don't fail at software — they outgrow it. The tools that worked at the start now need spreadsheets, manual steps, and copy-paste to hold together.",
    signsTitle: "Signs it's time:",
    signs: [
      "Your team runs critical work in spreadsheets beside paid software",
      "The same data gets entered into three different systems",
      "Staff lose hours a day to manual steps a system should handle",
      "No off-the-shelf product fits the way you actually operate",
    ],
    closing:
      "When the workarounds cost more than the software, it's time to build something that fits.",
  },
  services: {
    h2: "What we build",
    intro:
      "We build the systems and apps that replace manual work and connect the tools you already use.",
    items: [
      {
        title: "Web Applications",
        description:
          "The system your team works in, or the product your customers use",
      },
      {
        title: "Mobile Apps",
        description: "iOS and Android, for your team and your customers",
      },
      {
        title: "Internal Systems & Automation",
        description: "One system instead of scattered spreadsheets",
      },
      {
        title: "Websites & E-commerce",
        description: "Fast, search-ready sites and stores",
      },
      {
        title: "Digital Marketing",
        description: "Get found by the customers already searching",
      },
    ],
    cta: { label: "See all services", href: "/services" as const },
  },
  work: {
    h2: "Recent work",
    intro: "A look at systems and sites we've built.",
    projects: [
      { name: "edv.app", description: "Investments & programs management system" },
      { name: "Echo", description: "Website" },
      { name: "Orcaframe", description: "Website" },
    ],
    cta: { label: "See our work", href: "/work" as const },
  },
  why: {
    h2: "Why businesses choose Gorcel",
    items: [
      {
        title: "You know the cost before we start",
        body: "Fixed scope and price, agreed upfront. No surprise invoices.",
      },
      {
        title: "You own everything we build",
        body: "Full source code and rights. No lock-in, no license fees on your own software.",
      },
      {
        title: "You see progress, not promises",
        body: "Real, working software at the end of every cycle.",
      },
    ],
  },
  faq: {
    h2: "Frequently asked questions",
    items: [
      {
        question: "How do I know if I need custom software?",
        answer:
          "If your team relies on spreadsheets and manual steps to fill gaps your current tools leave, you've likely outgrown off-the-shelf software. That's the point custom software pays off.",
      },
      {
        question: "How much does it cost?",
        answer:
          "We agree on a fixed price before any work starts, so you know the cost upfront. Request a quote for a clear number.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most projects deliver working software within weeks, because we build in short cycles. The timeline is fixed during discovery.",
      },
      {
        question: "Do I own the software?",
        answer:
          "Yes — full source code, full rights, no lock-in, no recurring license fees.",
      },
      {
        question: "Do you work with businesses outside Egypt?",
        answer: "Yes. We work across MENA and beyond, remotely and on-site.",
      },
    ],
  },
} as const;
