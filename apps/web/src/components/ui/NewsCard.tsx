import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArtPlaceholder } from "@/components/ui/ArtPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { newsCategoryLabels } from "@/data/news";
import { cn, formatDate } from "@/lib/utils";
import type { NeonTone, NewsArticle } from "@/types/content";

const categoryTone: Record<NewsArticle["category"], NeonTone> = {
  mercado: "blue",
  lancamentos: "red",
  sistemas: "purple",
  editoras: "green",
  comunidade: "amber",
};

const categoryTextTone: Record<NeonTone, string> = {
  blue: "text-neon-blue",
  red: "text-neon-red",
  purple: "text-neon-purple",
  green: "text-neon-green",
  amber: "text-neon-amber",
};

interface NewsCardProps {
  article: NewsArticle;
  variant?: "featured" | "row";
  className?: string;
}

/**
 * Notícia em dois formatos (design.md §19):
 * `featured` = painel com arte 16:9 e título display;
 * `row` = linha de índice editorial — data | categoria | título | ↗.
 */
export function NewsCard({ article, variant = "row", className }: NewsCardProps) {
  const href = `/noticias/${article.slug}`;

  if (variant === "featured") {
    return (
      <Card className={cn("group flex h-full flex-col overflow-hidden p-0", className)} data-reveal>
        <div className="relative aspect-video w-full overflow-hidden border-b border-border-strong">
          <ArtPlaceholder variant={article.artVariant} />
          <div className="absolute left-4 top-4">
            <Badge tone={categoryTone[article.category]} dot>
              {newsCategoryLabels[article.category]}
            </Badge>
          </div>
        </div>

        <div className="flex grow flex-col p-7">
          <div className="flex items-center gap-3 font-mono text-2xs uppercase tracking-[0.12em] text-text-muted">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true" className="size-1 bg-border-strong" />
            <span>{article.readingTimeMinutes}min de leitura</span>
          </div>

          <h3 className="mt-4 text-balance font-display text-display-md font-black uppercase tracking-tight text-text-primary">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {article.title}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 text-sm/6 text-text-secondary">{article.excerpt}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-faint pt-5">
            <span className="font-mono text-2xs uppercase tracking-widest text-text-muted">
              {article.source}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-ember",
                "transition-colors duration-200 group-hover:text-text-primary"
              )}
            >
              Ler notícia
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <article
      className={cn(
        "group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-border-strong py-5",
        "sm:grid-cols-[6.5rem_7rem_1fr_auto] sm:gap-x-5",
        "transition-colors duration-200 hover:bg-surface-primary",
        className
      )}
      data-reveal
    >
      <time
        dateTime={article.publishedAt}
        className="col-start-1 font-mono text-2xs uppercase tracking-widest text-text-muted sm:col-auto"
      >
        {formatDate(article.publishedAt)}
      </time>

      <span
        className={cn(
          "col-start-1 hidden font-mono text-2xs font-bold uppercase tracking-[0.12em] sm:col-auto sm:block",
          categoryTextTone[categoryTone[article.category]]
        )}
      >
        {newsCategoryLabels[article.category]}
      </span>

      <h3 className="col-start-1 line-clamp-2 text-base/snug font-bold text-text-primary sm:col-auto">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
          {article.title}
        </Link>
      </h3>

      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "col-start-2 row-start-1 size-5 self-center text-text-muted sm:col-auto sm:row-auto",
          "transition-all duration-200 ease-out-soft",
          "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-ember"
        )}
      />
    </article>
  );
}
