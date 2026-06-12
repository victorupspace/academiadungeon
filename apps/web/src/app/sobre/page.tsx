import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Academia Dungeon é um hub editorial e educacional para mestres de RPG — materiais, guias, notícias, cursos e comunidade.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <ComingSoon
      badge="Em escrita"
      eyebrow="A casa"
      title="Todo salão tem sua história."
      description="A página sobre a Academia — quem somos, por que existimos e o juramento que guia o que publicamos — está sendo escrita. O manifesto resumido você encontra na página inicial."
    />
  );
}
