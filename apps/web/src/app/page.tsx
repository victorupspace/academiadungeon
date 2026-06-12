import type { Metadata } from "next";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Marquee } from "@/components/ui/Marquee";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { NewsSection } from "@/components/sections/NewsSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const MARQUEE_ITEMS = [
  "Materiais",
  "Guias para mestres",
  "Notícias",
  "Cursos em breve",
  "D&D",
  "DCC",
  "Pathfinder",
  "Old School",
  "Comunidade em construção",
];

export default function HomePage() {
  return (
    <>
      <main id="conteudo">
        <HeroSection />
        <CategoriesSection />
        <Marquee items={MARQUEE_ITEMS} />
        <MaterialsSection />
        <SectionDivider />
        <NewsSection />
        <CommunitySection />
        <ManifestoSection />
        <NewsletterSection />
      </main>
      <MusicPlayer />
    </>
  );
}
