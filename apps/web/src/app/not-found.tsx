import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Sala não mapeada",
};

export default function NotFound() {
  return (
    <ComingSoon
      badge="404 · Sala não mapeada"
      badgeTone="red"
      title="Você abriu uma porta que ainda não foi escavada."
      description="O corredor termina aqui — ou o mapa está errado, ou esta sala nunca existiu. Volte ao salão principal antes que algo perceba a sua presença."
      withNewsletterCta={false}
    />
  );
}
