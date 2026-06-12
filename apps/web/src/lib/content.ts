import { platformCategories } from "@/data/categories";
import { communityFeatures } from "@/data/community";
import { materialCategories, materials } from "@/data/materials";
import { newsArticles } from "@/data/news";
import type {
  CommunityFeature,
  Material,
  MaterialCategory,
  NewsArticle,
  PlatformCategory,
} from "@/types/content";

/**
 * Camada de acesso a conteúdo.
 *
 * Hoje lê dos mocks em `src/data`; quando o backoffice/Supabase entrar,
 * estas funções passam a consultar o banco (ex.:
 * `supabase.from("materials").select().eq("status", "published")`)
 * sem que nenhum componente precise mudar.
 */

const byNewest = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

export function getPublishedMaterials(): Material[] {
  return materials.filter((m) => m.status === "published").sort(byNewest);
}

export function getMaterialCategories(): MaterialCategory[] {
  return materialCategories;
}

export function getMaterialCategory(slug: Material["category"]): MaterialCategory {
  const found = materialCategories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Categoria de material desconhecida: ${slug}`);
  return found;
}

export function getFeaturedNews(): NewsArticle | undefined {
  return getPublishedNews().find((n) => n.featured);
}

export function getSecondaryNews(limit = 3): NewsArticle[] {
  return getPublishedNews()
    .filter((n) => !n.featured)
    .slice(0, limit);
}

export function getPublishedNews(): NewsArticle[] {
  return newsArticles.filter((n) => n.status === "published").sort(byNewest);
}

export function getPlatformCategories(): PlatformCategory[] {
  return platformCategories;
}

export function getCommunityFeatures(): CommunityFeature[] {
  return communityFeatures;
}
