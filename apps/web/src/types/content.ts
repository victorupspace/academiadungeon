/**
 * Modelos de conteúdo da Academia Dungeon.
 *
 * Estas interfaces espelham a modelagem futura do backoffice/Supabase
 * (tabelas: profiles, posts, materials, material_categories, news,
 * courses, newsletter_subscribers, community_waitlist, rpg_tables,
 * assets). Os dados mockados em `src/data` implementam estes contratos;
 * quando o CMS entrar, apenas a origem muda — os componentes não.
 */

/** Ciclo de vida editorial de qualquer conteúdo (coluna `status`). */
export type ContentStatus =
  | "draft"
  | "in_review"
  | "scheduled"
  | "published"
  | "archived";

/** Cores neon com semântica fixa (ver design.md §3). */
export type NeonTone = "green" | "blue" | "purple" | "amber" | "red";

/** Nomes de ícone persistíveis (registry em `src/lib/icons.ts`). */
export type ContentIconName =
  | "book-open"
  | "newspaper"
  | "users"
  | "list-checks"
  | "castle"
  | "dices"
  | "compass"
  | "sparkles"
  | "scroll-text"
  | "map"
  | "swords"
  | "flame"
  | "trophy"
  | "calendar"
  | "megaphone"
  | "library";

/** Variantes de arte procedural para frames de mídia (sem assets binários). */
export type ArtVariant = "portal" | "ember" | "map" | "candle" | "dice";

/** Tabela futura: profiles */
export interface Author {
  id: string;
  name: string;
  role: string;
}

/** Tabela futura: material_categories */
export interface MaterialCategory {
  slug: MaterialCategorySlug;
  label: string;
  tone: NeonTone;
}

export type MaterialCategorySlug =
  | "preparacao"
  | "worldbuilding"
  | "narrativa"
  | "ferramentas"
  | "old-school";

export type MaterialDifficulty = "iniciante" | "intermediario" | "veterano";

/** Tabela futura: materials */
export interface Material {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: ContentSection[];
  category: MaterialCategorySlug;
  tags: string[];
  readingTimeMinutes: number;
  difficulty: MaterialDifficulty;
  icon: ContentIconName;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string; // ISO 8601
  authorId: string;
}

export type NewsCategorySlug =
  | "mercado"
  | "lancamentos"
  | "sistemas"
  | "editoras"
  | "comunidade";

/** Tabela futura: news */
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: ContentSection[];
  category: NewsCategorySlug;
  tags: string[];
  source: string;
  readingTimeMinutes: number;
  artVariant: ArtVariant;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string; // ISO 8601
  authorId: string;
}

/** Bloco editorial simples usado nas paginas estaticas de detalhe. */
export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** Áreas de topo da plataforma (cards de entrada na home). */
export interface PlatformCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: ContentIconName;
  tone: NeonTone;
  href: string;
  ctaLabel: string;
  status: "available" | "construction";
}

/** Funcionalidades futuras da comunidade (tabela futura: community_waitlist). */
export interface CommunityFeature {
  id: string;
  label: string;
  icon: ContentIconName;
}

/** Item de navegação do site. */
export interface NavItem {
  label: string;
  href: string;
  soon?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  network: "instagram" | "youtube" | "twitter" | "discord";
}
