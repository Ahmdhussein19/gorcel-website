import type { Metadata } from "next";
import WorkClient from '@/components/page-components/work-client';

export const metadata: Metadata = {
  title: "Work — Custom Software Projects | Gorcel",
  description: "Custom software projects built for ownership. Investment management platforms, dashboards, automation systems. No license fees, no lock-in.",
  keywords: "custom software development MENA, bespoke software development Cairo, enterprise software development Egypt, software partner Egypt, custom software projects Cairo, software development portfolio Egypt, business software solutions MENA, web application portfolio Egypt, mobile app development portfolio Cairo, custom software case studies Egypt",
  openGraph: {
    title: "Work — Custom Software Projects | Gorcel",
    description: "Custom software projects built for ownership. Investment management platforms, dashboards, automation systems. No license fees, no lock-in.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Custom Software Projects | Gorcel",
    description: "Custom software projects built for ownership. Investment management platforms, dashboards, automation systems. No license fees, no lock-in.",
  },
};

export default function Work() {
  return <WorkClient />;
}
