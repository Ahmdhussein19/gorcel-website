import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeProblem } from "@/components/sections/home/HomeProblem";
import { HomeServicesPreview } from "@/components/sections/home/HomeServicesPreview";
import { Divider } from "@/components/shared/Divider";
import { homeContent } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: homeContent.meta.title,
  description: homeContent.meta.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content" className="page-margin mx-auto max-w-content pb-[var(--space-12)]">
      <HomeHero />
      <Divider />
      <HomeProblem />
      <Divider />
      <HomeServicesPreview />
      <Divider />
      <HomeFaq />
    </main>
  );
}
