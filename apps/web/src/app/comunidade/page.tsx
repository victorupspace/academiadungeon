import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Comunidade",
  description:
    "A comunidade da Academia Dungeon: divulgação de mesas, busca de jogadores, fóruns por sistema e reputação de mestres. Em construção.",
  alternates: { canonical: "/comunidade" },
};

export default function ComunidadePage() {
  return (
    <ComingSoon
      eyebrow="Salão da guilda"
      title="A comunidade ainda está selada atrás da porta."
      description="Divulgar mesas, encontrar jogadores, publicar materiais, fóruns por sistema e reputação de mestre — tudo isso está sendo construído. Entre na lista de espera e seja avisado quando a porta abrir."
    />
  );
}
