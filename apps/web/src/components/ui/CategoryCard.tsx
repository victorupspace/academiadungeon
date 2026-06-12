import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { contentIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/types/content";

const MAX_VISIBLE_TAGS = 4;

interface CategoryCardProps {
  category: PlatformCategory;
  /** Índice técnico exibido no topo (ex.: "01"). */
  index: string;
  variant?: "default" | "featured";
  className?: string;
  reveal?: boolean;
}

/**
 * Porta de entrada de ala (design.md §19): índice mono crimson, título
 * em caixa alta, estrutura exposta. Card inteiro clicável via stretched
 * link no título; seta ↗ reage ao hover do grupo.
 */
export function CategoryCard({
  category,
  index,
  variant = "default",
  className,
  reveal = true,
}: CategoryCardProps) {
  const Icon = contentIcons[category.icon];
  const visibleTags = category.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = category.tags.length - visibleTags.length;
  const featured = variant === "featured";

  return (
    <Card
      className={cn(
        "group flex h-full flex-col",
        featured ? "min-h-[15rem] p-6 sm:p-7" : "p-6",
        className
      )}
      data-reveal={reveal ? "" : undefined}
    >
      <div className="flex items-start justify-between">
        <span className={cn("font-mono font-bold text-brand-ember", featured ? "text-base" : "text-sm")}>
          /{index}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            featured ? "size-6" : "size-5",
            "text-text-muted transition-all duration-200 ease-out-soft",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-ember"
          )}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center border border-border-strong bg-bg-secondary",
            featured ? "size-11" : "size-10",
            "text-text-primary transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-ember"
          )}
          aria-hidden="true"
        >
          <Icon className={featured ? "size-5" : "size-4.5"} strokeWidth={1.6} />
        </span>

        <h3
          className={cn(
            "font-display font-black uppercase tracking-tight text-text-primary",
            featured ? "text-2xl/tight sm:text-3xl/tight" : "text-xl/tight"
          )}
        >
          <Link
            href={category.href}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {category.title}
          </Link>
        </h3>
      </div>

      <p
        className={cn(
          "mt-4 text-text-secondary",
          featured ? "max-w-xl text-sm/6 sm:text-base/7" : "text-sm/6"
        )}
      >
        {category.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {hiddenCount > 0 && <Tag className="text-text-muted">+{hiddenCount}</Tag>}
      </div>

      <span
        className={cn(
          "mt-auto inline-flex items-center gap-2 border-t border-border-faint pt-4",
          "font-mono font-bold uppercase tracking-[0.14em] text-brand-ember",
          featured ? "text-sm" : "text-xs",
          "transition-colors duration-200 group-hover:text-text-primary"
        )}
      >
        {category.ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Card>
  );
}
