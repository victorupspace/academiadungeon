import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Cursos da Academia Dungeon para mestres de RPG: trilhas estruturadas de narrativa, preparação e condução de mesa.",
  alternates: { canonical: "/cursos" },
};

export default function CursosPage() {
  return (
    <ComingSoon
      eyebrow="Salão de treinamento"
      title="O salão de treinamento está sendo forjado."
      description="Cursos estruturados com prática guiada, do fundamento à maestria — narrativa, preparação, improviso e construção de campanhas. As inscrições da primeira turma serão anunciadas pela newsletter."
    />
  );
}
