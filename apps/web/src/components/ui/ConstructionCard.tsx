import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { contentIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/types/content";

interface ConstructionCardProps {
  category: PlatformCategory;
  /** Índice técnico exibido no topo (ex.: "03"). */
  index: string;
  className?: string;
  reveal?: boolean;
}

/**
 * Variante selada do CategoryCard (design.md §19): listra de risco no
 * topo, cadeado, conteúdo atenuado — deliberado, nunca "quebrado".
 * Sem stretched link; o convite vive na seção de comunidade.
 */
export function ConstructionCard({
  category,
  index,
  className,
  reveal = true,
}: ConstructionCardProps) {
  const Icon = contentIcons[category.icon];

  return (
    <Card
      interactive={false}
      className={cn("group relative flex h-full flex-col overflow-hidden p-6", className)}
      data-reveal={reveal ? "" : undefined}
    >
      {/* listra de risco selando o topo */}
      <div aria-hidden="true" className="hazard-strip absolute inset-x-0 top-0 h-1.5 opacity-80" />

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-sm font-bold text-text-muted">/{index}</span>
        <Badge tone="amber" dot pulse>
          Em construção
        </Badge>
      </div>

      <div className="opacity-60">
        <div className="mt-6 flex items-center gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center border border-border-strong bg-bg-secondary text-text-muted"
            aria-hidden="true"
          >
            <Icon className="size-4.5" strokeWidth={1.6} />
          </span>
          <h3 className="font-display text-xl/tight font-black uppercase tracking-tight text-text-primary">
            {category.title}
          </h3>
        </div>
        <p className="mt-4 text-sm/6 text-text-secondary">{category.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {category.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <span
        aria-disabled="true"
        className={cn(
          "mt-auto inline-flex w-fit select-none items-center gap-2 border border-border-strong px-4 py-2",
          "font-mono text-xs font-bold uppercase tracking-[0.14em] text-text-muted"
        )}
      >
        <Lock className="size-3" aria-hidden="true" />
        {category.ctaLabel}
      </span>
    </Card>
  );
}
