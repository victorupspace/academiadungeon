import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Área do Mestre",
  description: "Backoffice da Academia Dungeon — acesso restrito.",
  robots: { index: false, follow: false },
};

/**
 * Placeholder do futuro backoffice (apps/admin): gestão de posts,
 * materiais, notícias, cursos, comunidade e newsletter — com os status
 * editoriais definidos em design.md §21.
 */
export default function AdminPage() {
  return (
    <ComingSoon
      badge="Acesso restrito"
      badgeTone="brand"
      eyebrow="Área do Mestre"
      title="O escritório do mestre está sendo mobiliado."
      description="Aqui viverá o backoffice da Academia: publicação de materiais, notícias e cursos, gestão da comunidade e da newsletter. O acesso será liberado para a guilda editorial em breve."
      withNewsletterCta={false}
    />
  );
}
