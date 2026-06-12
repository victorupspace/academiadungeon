import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Guias",
  description:
    "Guias de mestragem da Academia Dungeon: preparação, narrativa, improviso e condução de mesas. Em escrita.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <ComingSoon
      eyebrow="Ala dos guias"
      title="Os guias estão sendo escritos à luz de velas."
      description="Trilhas completas de mestragem — do primeiro escudo às campanhas longas — organizadas por nível de experiência. Os primeiros capítulos já vivem na biblioteca da página inicial."
    />
  );
}
