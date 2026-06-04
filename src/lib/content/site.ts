import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Gorcel",
  url: "https://gorcel.com",
  email: "hello@gorcel.com",
  location: "Cairo, Egypt",
  region: "Serving MENA · Europe · Beyond",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaBandContent = {
  copy: "Tell us what's slowing your business down — get a fixed quote, no sales calls.",
  cta: { label: "Get a fixed quote", href: "/contact" as const },
} as const;

export const footerContent = {
  tagline: "Cairo, Egypt · Serving MENA",
  copyright: "© 2025 Gorcel",
  email: siteConfig.email,
} as const;
