export type SitePath = "/" | "/services" | "/work" | "/about" | "/contact";

export interface NavItem {
  label: string;
  href: SitePath;
}

export interface CtaLink {
  label: string;
  href: SitePath;
}
