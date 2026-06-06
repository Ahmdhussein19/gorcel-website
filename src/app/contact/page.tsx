import type { Metadata } from "next";
import ContactClient from '@/components/page-components/contact-client';

export const metadata: Metadata = {
  title: "Contact — Get a Fixed Quote | Gorcel",
  description: "Contact Gorcel for custom software development in Cairo, Egypt. Reply within one business day. Fixed scope, fixed price proposals. No sales calls.",
  keywords: "software outsourcing Egypt, software development company Cairo, custom software development Egypt, software development services Cairo, web development company Egypt, mobile app development Cairo, software consultancy Egypt, IT services Cairo, software solutions Egypt, custom software quote Cairo",
  openGraph: {
    title: "Contact — Get a Fixed Quote | Gorcel",
    description: "Contact Gorcel for custom software development in Cairo, Egypt. Reply within one business day. Fixed scope, fixed price proposals. No sales calls.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Get a Fixed Quote | Gorcel",
    description: "Contact Gorcel for custom software development in Cairo, Egypt. Reply within one business day. Fixed scope, fixed price proposals. No sales calls.",
  },
};

export default function Contact() {
  return <ContactClient />;
}
