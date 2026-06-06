import type { Metadata } from "next";
import ServicesClient from '@/components/page-components/services-client';

export const metadata: Metadata = {
  title: "Services — Web Apps, Mobile Apps, Internal Systems | Gorcel",
  description: "Software development services: Web applications, mobile apps, internal systems & automation, websites & e-commerce, digital marketing. Fixed price, full ownership.",
  keywords: "web application development Egypt, mobile app development Cairo, internal systems development Egypt, ERP development company Cairo, CRM development Egypt, custom ERP software MENA, workflow automation Egypt, inventory management software Cairo, operations management system Egypt, business process automation MENA, e-commerce development Egypt, digital marketing services Cairo, SEO services Egypt, mobile app development MENA, web development company Cairo",
  openGraph: {
    title: "Services — Web Apps, Mobile Apps, Internal Systems | Gorcel",
    description: "Software development services: Web applications, mobile apps, internal systems & automation, websites & e-commerce, digital marketing. Fixed price, full ownership.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Web Apps, Mobile Apps, Internal Systems | Gorcel",
    description: "Software development services: Web applications, mobile apps, internal systems & automation, websites & e-commerce, digital marketing. Fixed price, full ownership.",
  },
};

export default function Services() {
  return <ServicesClient />;
}
