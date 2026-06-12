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
      description="Tratamos dados de contato com o mínimo necessário e nada é compartilhado. O documento formal, alinhado à LGPD, será publicado aqui."
      withNewsletterCta={false}
    />
  );
}
