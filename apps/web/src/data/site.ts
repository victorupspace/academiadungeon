import type { NavItem, SocialLink } from "@/types/content";

/**
 * Configuração global do site. Futuramente parte disso migra para o
 * backoffice (settings), mas a estrutura de consumo permanece a mesma.
 */
export const siteConfig = {
  name: "Academia Dungeon",
  shortName: "Academia Dungeon",
  tagline: "Domine a arte de narrar mundos.",
  description:
    "Hub para mestres de RPG que querem evoluir sua narrativa, preparar aventuras melhores, estudar sistemas, acessar materiais e acompanhar o universo dos jogos de mesa.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://academiadungeon.com.br",
  locale: "pt_BR",
  contactEmail: "contato@academiadungeon.com.br",
} as const;

export const navigation: NavItem[] = [
  { label: "Materiais", href: "/materiais" },
  { label: "Guias", href: "/guias" },
  { label: "Notícias", href: "/noticias" },
  { label: "Cursos", href: "/cursos" },
  { label: "Comunidade", href: "/comunidade", soon: true },
  { label: "Sobre", href: "/sobre" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/academiadungeon", network: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@academiadungeon", network: "youtube" },
  { label: "X (Twitter)", href: "https://x.com/academiadungeon", network: "twitter" },
  { label: "Discord", href: "https://discord.gg/academiadungeon", network: "discord" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Plataforma",
    links: [
      { label: "Materiais", href: "/materiais" },
      { label: "Guias", href: "/guias" },
      { label: "Notícias", href: "/noticias" },
      { label: "Cursos", href: "/cursos" },
    ],
  },
  {
    title: "Academia",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Comunidade", href: "/comunidade", soon: true },
      { label: "Faça parte", href: "/#faca-parte" },
      { label: "Contato", href: "mailto:contato@academiadungeon.com.br" },
    ],
  },
];
