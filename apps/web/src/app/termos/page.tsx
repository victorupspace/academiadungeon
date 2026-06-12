import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Termos de uso",
  robots: { index: false },
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <ComingSoon
      badge="Em escrita"
      badgeTone="brand"
      eyebrow="Pergaminhos legais"
      title="Os termos de uso estão com os escribas."
      description="O documento completo será publicado antes da abertura das contas de usuário. Dúvidas até lá: contato@academiadungeon.com.br."
      withNewsletterCta={false}
    />
  );
}
