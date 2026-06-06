import type { Metadata } from "next";
import HomeClient from '@/components/page-components/home-client';

export const metadata: Metadata = {
  title: "Gorcel — Custom Software Development in Cairo & MENA",
  description: "Custom software your business owns outright. Fixed scope, fixed price. Web apps, mobile apps, internal systems. Cairo, Egypt serving MENA region.",
  keywords: "custom software development Cairo, custom software development Egypt, software development company Cairo, web application development Egypt, mobile app development Cairo, business software development MENA, internal systems development Egypt, ERP development company Cairo, CRM development Egypt, custom ERP software MENA, software partner Egypt, bespoke software development Cairo, enterprise software development Egypt, fixed price software development, software development company MENA, web app development company Egypt, digital transformation Egypt, software outsourcing Egypt, software agency Cairo",
  openGraph: {
    title: "Gorcel — Custom Software Development in Cairo & MENA",
    description: "Custom software your business owns outright. Fixed scope, fixed price. Web apps, mobile apps, internal systems.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorcel — Custom Software Development in Cairo & MENA",
    description: "Custom software your business owns outright. Fixed scope, fixed price. Web apps, mobile apps, internal systems.",
  },
};

export default function Home() {
  return <HomeClient />;
}
