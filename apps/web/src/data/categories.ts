import type { PlatformCategory } from "@/types/content";

/**
 * Áreas de topo da plataforma — cards de entrada logo abaixo do hero.
 * Futuramente vem do backoffice (tabela post_categories / áreas).
 */
export const platformCategories: PlatformCategory[] = [
  {
    id: "cat-materiais",
    slug: "materiais",
    title: "Materiais",
    description:
      "Ferramentas, tabelas, checklists, aventuras curtas e arquivos prontos para abrir durante a preparação.",
    tags: ["Tabelas", "Checklists", "Aventuras", "Ferramentas"],
    icon: "library",
    tone: "green",
    href: "/materiais",
    ctaLabel: "Acessar materiais",
    status: "available",
  },
  {
    id: "cat-guias",
    slug: "guias",
    title: "Guias",
    description:
      "Métodos de mestragem, preparação, narrativa, improviso e condução de campanhas para estudar com calma.",
    tags: ["Preparação", "Narrativa", "Improviso", "Campanhas"],
    icon: "book-open",
    tone: "purple",
    href: "/guias",
    ctaLabel: "Ver guias",
    status: "available",
  },
  {
    id: "cat-noticias",
    slug: "noticias",
    title: "Notícias",
    description:
      "Atualizações, lançamentos, editoras, sistemas, suplementos, campanhas e tendências do mercado de RPG de mesa.",
    tags: ["Mercado", "Lançamentos", "Sistemas", "Editoras"],
    icon: "newspaper",
    tone: "blue",
    href: "/noticias",
    ctaLabel: "Ler notícias",
    status: "available",
  },
  {
    id: "cat-comunidade",
    slug: "comunidade",
    title: "Comunidade",
    description:
      "Em breve, um espaço para mestres trocarem ideias, divulgarem mesas, compartilharem materiais e formarem grupos.",
    tags: ["Mesas", "Jogadores", "Grupos", "Eventos"],
    icon: "users",
    tone: "amber",
    href: "/comunidade",
    ctaLabel: "Em breve",
    status: "construction",
  },
];
