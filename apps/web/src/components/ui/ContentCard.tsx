import Link from "next/link";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { contentIcons } from "@/lib/icons";
import { cn, difficultyLabels } from "@/lib/utils";
import type { Material, MaterialCategory } from "@/types/content";

const MAX_VISIBLE_TAGS = 3;

const dotTone: Record<MaterialCategory["tone"], string> = {
  green: "bg-neon-green",
  blue: "bg-neon-blue",
  purple: "bg-neon-purple",
  amber: "bg-neon-amber",
  red: "bg-neon-red",
};

interface ContentCardProps {
  material: Material;
  category: MaterialCategory;
  className?: string;
}

/**
 * Artefato de biblioteca (design.md §19): meta técnica → título →
 * excerto → tags → rodapé com regra. Card inteiro clicável.
 */
export function ContentCard({ material, category, className }: ContentCardProps) {
  const Icon = contentIcons[material.icon];
  const visibleTags = material.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <Card className={cn("group flex h-full flex-col p-6", className)} data-reveal>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-2xs font-bold uppercase tracking-[0.12em] text-text-secondary">
          <span aria-hidden="true" className={cn("size-1.5", dotTone[category.tone])} />
          {category.label}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.08em] text-text-muted">
          <Clock className="size-3" aria-hidden="true" />
          {material.readingTimeMinutes}min
        </span>
      </div>

      <div className="mt-5 flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 flex size-9 shrink-0 items-center justify-center border border-border-strong bg-bg-secondary",
            "text-text-secondary transition-colors duration-200 group-hover:border-brand-accent group-hover:text-brand-ember"
          )}
        >
          <Icon className="size-4.5" strokeWidth={1.5} />
        </span>
        <h3 className="line-clamp-2 text-lg/snug font-bold text-text-primary">
          <Link
            href={`/materiais/${material.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {material.title}
          </Link>
        </h3>
      </div>

      <p className="mt-3 line-clamp-3 text-sm/6 text-text-secondary">{material.excerpt}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-faint pt-4">
        <span className="font-mono text-2xs uppercase tracking-widest text-text-muted">
          {difficultyLabels[material.difficulty]}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-ember",
            "transition-colors duration-200 group-hover:text-text-primary"
          )}
        >
          Ler material
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Card>
  );
}
