export const servicesContent = {
  meta: {
    title:
      "Software Development Services — Web, Mobile & Internal Systems | Gorcel",
    description:
      "Web apps, mobile apps, internal systems, and automation for businesses across MENA. Built around your workflow, delivered at fixed cost.",
  },
  hero: {
    h1: "Software development services built around how you work",
    body: "We don't pick a stack and force your business into it. We start with how you operate, then build the systems that fit.",
  },
  offerings: [
    {
      title: "Web Applications",
      description: "The system your team lives in, or the product your customers use.",
      bullets: [
        "Internal dashboards and admin portals",
        "Customer-facing platforms and SaaS",
        "Tools that connect software you already pay for",
      ],
    },
    {
      title: "Mobile Apps",
      description: "Your business in the hands of your team and customers.",
      bullets: [
        "iOS and Android apps",
        "Offline-capable field-team apps",
        "Customer apps tied to your systems",
      ],
    },
    {
      title: "Internal Systems & Automation",
      description:
        "One system that does what your spreadsheets and manual steps do now.",
      bullets: [
        "Workflow and process automation",
        "Inventory, operations, and CRM systems",
        "ERP-class systems where the business needs one",
      ],
    },
    {
      title: "Websites & E-commerce",
      description: "Fast, search-ready sites that bring in customers.",
      bullets: ["Marketing websites", "E-commerce stores"],
    },
    {
      title: "Digital Marketing",
      description: "Get found by the people already searching for you.",
      bullets: ["SEO and local search", "Paid ads and content"],
    },
  ],
  process: {
    h2: "How we work",
    intro: "Five stages, from first conversation to launch and beyond.",
    steps: [
      { title: "Discovery", body: "We map how your business works before writing code." },
      { title: "Design", body: "We plan the system around your workflow, not a template." },
      { title: "Build", body: "Short cycles. You see working software, not status reports." },
      { title: "Launch", body: "Structured handover with documentation and training." },
      { title: "Support", body: "Ongoing help if you want it. Your choice, never a trap." },
    ],
  },
  faq: {
    h2: "Services FAQ",
    items: [
      {
        question: "What's the difference between custom software and off-the-shelf tools?",
        answer:
          "Off-the-shelf software forces your business to adapt to it. Custom software is built around how you already work, so there are no workarounds.",
      },
      {
        question: "Can you work with the software we already have?",
        answer:
          "Yes. We often build tools that connect and extend the systems you already pay for, instead of replacing everything.",
      },
      {
        question: "Do you maintain it after launch?",
        answer:
          "If you want us to. Support is your choice — never a forced retainer.",
      },
    ],
  },
} as const;
