import type { Metadata } from "next";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = "https://gorcel.com";

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageSEO): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage ?? "/og/default.png";

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Gorcel",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}
