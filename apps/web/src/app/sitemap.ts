import type { MetadataRoute } from "next";
import { newsArticles } from "@/data/news";
import { siteConfig } from "@/data/site";
import { getPublishedMaterials } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/materiais`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/guias`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/noticias`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/cursos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/comunidade`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/sobre`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const materialRoutes: MetadataRoute.Sitemap = getPublishedMaterials().map((material) => ({
    url: `${siteConfig.url}/materiais/${material.slug}`,
    lastModified: material.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: `${siteConfig.url}/noticias/${article.slug}`,
      lastModified: article.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...materialRoutes, ...newsRoutes];
}
