import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Política de privacidade",
  robots: { index: false },
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <ComingSoon
      badge="Em escrita"
      badgeTone="brand"
      eyebrow="Pergaminhos legais"
      title="A política de privacidade está sendo lavrada."
      description="Tratamos os dados da newsletter com o mínimo necessário (nome e e-mail) e nada é compartilhado. O documento formal, alinhado à LGPD, será publicado aqui."
      withNewsletterCta={false}
    />
  );
}
