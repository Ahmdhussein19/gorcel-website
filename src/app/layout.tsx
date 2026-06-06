import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gorcel — Custom Software Development in MENA",
  description: "Custom software your business owns outright. Built around how you actually work.",
  metadataBase: new URL('https://gorcel.com'),
  openGraph: {
    title: "Gorcel — Custom Software Development in MENA",
    description: "Custom software your business owns outright. Built around how you actually work.",
    type: "website",
    locale: "en_EG",
    siteName: "Gorcel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorcel — Custom Software Development in MENA",
    description: "Custom software your business owns outright. Built around how you actually work.",
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/assets/gorcel-mark-angular-dark.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Gorcel',
    description: 'Custom software development company based in Cairo, Egypt. Fixed scope, fixed price, full ownership.',
    url: 'https://gorcel.com',
    telephone: '+201158472140',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'New Cairo',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.0131',
      longitude: '31.2089',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '18:00',
    },
    areaServed: ['Egypt', 'MENA', 'United Arab Emirates', 'Saudi Arabia', 'Qatar'],
    sameAs: ['https://linkedin.com/company/gorcelsolutions'],
  };

  return (
    <html lang="en-EG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href="https://gorcel.com" />
        <link rel="alternate" hrefLang="en-EG" href="https://gorcel.com" />
        <link rel="alternate" hrefLang="x-default" href="https://gorcel.com" />
        <meta name="geo.region" content="EG" />
        <meta name="geo.placename" content="Cairo" />
        <meta name="geo.position" content="30.0131;31.2089" />
        <meta name="ICBM" content="30.0131, 31.2089" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable}`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
