import { Dices, Flame, Map as MapIcon, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import type { ArtVariant } from "@/types/content";

interface ArtPlaceholderProps {
  variant: ArtVariant;
  className?: string;
}

/** Rótulo técnico exibido no canto da arte. */
const variantLabels: Record<ArtVariant, string> = {
  portal: "IMG_01//PORTAL",
  ember: "IMG_02//EMBER",
  map: "IMG_03//MAPA",
  candle: "IMG_04//VIGILIA",
  dice: "IMG_05//DADOS",
};

function VariantSigil({ variant }: { variant: ArtVariant }) {
  const className = "h-24 w-24 text-text-primary";
  switch (variant) {
    case "ember":
      return <Flame className={className} strokeWidth={1} />;
    case "map":
      return <MapIcon className={className} strokeWidth={1} />;
    case "candle":
      return <Sparkles className={className} strokeWidth={1} />;
    case "dice":
      return <Dices className={className} strokeWidth={1} />;
    case "portal":
      return <LogoMark className="h-28 w-28 text-text-primary" />;
  }
}

/**
 * Arte procedural para frames de mídia (design.md §18): grafite neutro,
 * grade técnica, sigilo ghosted, barra de acento e rótulo mono — nada
 * de gradientes coloridos. Substituída por assets reais via backoffice.
 */
export function ArtPlaceholder({ variant, className }: ArtPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-full w-full overflow-hidden bg-linear-to-b from-surface-elevated to-bg-secondary",
        className
      )}
    >
      <div className="dungeon-grid absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]">
        <VariantSigil variant={variant} />
      </div>
      {/* barra de acento + rótulo técnico */}
      <span className="absolute bottom-0 left-0 h-1 w-16 bg-brand-accent" />
      <span className="absolute bottom-2.5 right-3 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-text-muted">
        {variantLabels[variant]}
      </span>
      {/* vinheta para leitura de conteúdo sobreposto */}
      <div className="absolute inset-0 bg-linear-to-t from-bg-primary/70 via-transparent to-transparent" />
    </div>
  );
}
