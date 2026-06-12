import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/ui/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedNews, getSecondaryNews } from "@/lib/content";

/**
 * Notícias (prompt §15, v2): destaque em painel à esquerda e índice
 * editorial em linhas — data | categoria | título | ↗ — à direita.
 */
export function NewsSection() {
  const featured = getFeaturedNews();
  const secondary = getSecondaryNews(3);

  return (
    <section aria-labelledby="noticias-title" className="relative overflow-hidden py-section">
      <div aria-hidden="true" className="blob -left-40 top-1/3 h-96 w-96 opacity-40" />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Crônicas"
            title={<span id="noticias-title">Notícias do mundo das mesas</span>}
            description="Lançamentos, sistemas, editoras e o movimento do mercado de RPG — filtrado pelo olhar de quem mestra."
            action={
              <Button href="/noticias" variant="ghost" className="-mr-2 text-xs uppercase tracking-[0.12em]">
                Ver todas <span aria-hidden="true">→</span>
              </Button>
            }
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {featured && <NewsCard article={featured} variant="featured" />}

            <div data-reveal className="flex flex-col">
              <p className="pb-4 font-mono text-2xs font-bold uppercase tracking-[0.18em] text-text-muted">
                Últimas entradas
              </p>
              <div className="flex grow flex-col border-b border-border-strong">
                {secondary.map((article) => (
                  <NewsCard key={article.id} article={article} variant="row" />
                ))}
              </div>
              <p className="mt-4 font-mono text-2xs uppercase tracking-widest text-text-muted">
                {"// Arquivo completo em /noticias"}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
