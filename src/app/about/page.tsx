import type { Metadata } from "next";
import AboutClient from '@/components/page-components/about-client';

export const metadata: Metadata = {
  title: "About — Software Partner, Not Vendor | Gorcel",
  description: "A software partner based in Cairo, Egypt. Fixed scope, fixed price, full ownership. Working software, not promises. Serving MENA, Europe, and beyond.",
  keywords: "software development company MENA, software agency Cairo, fixed price software development, digital transformation Egypt, software outsourcing Egypt, custom software development Egypt, software partner Cairo, bespoke software development Egypt, enterprise software development Cairo, software development company Egypt",
  openGraph: {
    title: "About — Software Partner, Not Vendor | Gorcel",
    description: "A software partner based in Cairo, Egypt. Fixed scope, fixed price, full ownership. Working software, not promises. Serving MENA, Europe, and beyond.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Software Partner, Not Vendor | Gorcel",
    description: "A software partner based in Cairo, Egypt. Fixed scope, fixed price, full ownership. Working software, not promises. Serving MENA, Europe, and beyond.",
  },
};

export default function About() {
  return <AboutClient />;
}
