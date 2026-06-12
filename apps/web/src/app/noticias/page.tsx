import type { Metadata } from "next";
import { Clock, Newspaper, Radio, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/ui/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { newsCategoryLabels } from "@/data/news";
import { getPublishedNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Crônicas e análises sobre RPG de mesa: lançamentos, sistemas, comunidade, ferramentas e movimentos do mercado.",
  alternates: { canonical: "/noticias" },
};

const statCards: Array<{
  icon: LucideIcon;
  label: string;
  getValue: (total: number, minutes: number, categories: number) => string;
}> = [
  {
    icon: Newspaper,
    label: "Crônicas publicadas",
    getValue: (total) => total.toString().padStart(2, "0"),
  },
  {
    icon: Clock,
    label: "Minutos de leitura",
    getValue: (_total, minutes) => `${minutes}+`,
  },
  {
    icon: Radio,
    label: "Editorias ativas",
    getValue: (_total, _minutes, categories) => categories.toString(),
  },
];

export default function NoticiasPage() {
  const articles = getPublishedNews();
  const featured = articles.find((article) => article.featured);
  const archive = articles.filter((article) => article.id !== featured?.id);
  const categorySlugs = Array.from(new Set(articles.map((article) => article.category)));
  const totalReadingMinutes = articles.reduce(
    (total, article) => total + article.readingTimeMinutes,
    0
  );

  return (
    <main id="conteudo" className="relative overflow-hidden">
      <section className="relative border-b border-border-faint bg-bg-primary pt-[calc(var(--ad-header-height)+4rem)]">
        <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -left-36 top-20 h-[28rem] w-[28rem] rounded-full bg-brand-primary/18 blur-[120px]"
        />

        <Container className="relative pb-16 sm:pb-20">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <div data-reveal className="mb-7">
                  <Badge tone="red" dot>
                    Sala das crônicas
                  </Badge>
                </div>
                <h1
                  data-reveal
                  className="max-w-3xl text-balance font-display text-display-2xl font-semibold text-text-primary"
                >
                  Notícias e leituras para mestres atentos ao mundo das mesas.
                </h1>
                <p data-reveal className="mt-5 max-w-2xl text-pretty text-base/7 text-text-secondary">
                  Lançamentos, sistemas, comunidades, ferramentas e sinais do mercado de RPG
                  filtrados pelo olhar de quem precisa transformar informação em mesa boa.
                </p>
                <div data-reveal className="scroll-x -mx-container mt-8 gap-2.5 px-container pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 lg:mask-none">
                  {categorySlugs.map((category) => (
                    <Tag key={category}>{newsCategoryLabels[category]}</Tag>
                  ))}
                </div>
              </div>

              <div data-reveal className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border-subtle bg-surface-primary/70 p-5 shadow-card backdrop-blur-sm"
                    >
                      <Icon className="size-5 text-brand-ember" aria-hidden="true" />
                      <p className="mt-4 font-display text-4xl font-semibold text-text-primary">
                        {stat.getValue(articles.length, totalReadingMinutes, categorySlugs.length)}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-label text-text-muted">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="noticia-destaque-title" className="py-section-sm">
        <Container>
          <Reveal>
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow" data-reveal>
                  <span aria-hidden="true" className="mr-2 opacity-70">
                    ◆
                  </span>
                  Destaque editorial
                </p>
                <h2
                  id="noticia-destaque-title"
                  data-reveal
                  className="mt-4 text-balance font-display text-display-lg font-semibold text-text-primary"
                >
                  A crônica mais recente da redação
                </h2>
              </div>
              {featured && (
                <p data-reveal className="text-sm text-text-muted">
                  Publicada em {formatDate(featured.publishedAt)}
                </p>
              )}
            </div>

            {featured && <NewsCard article={featured} variant="featured" />}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="arquivo-title" className="bg-bg-secondary py-section">
        <Container>
          <Reveal>
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow" data-reveal>
                  <span aria-hidden="true" className="mr-2 opacity-70">
                    ◆
                  </span>
                  Arquivo
                </p>
                <h2
                  id="arquivo-title"
                  data-reveal
                  className="mt-4 text-balance font-display text-display-lg font-semibold text-text-primary"
                >
                  Mais leituras publicadas
                </h2>
              </div>
              <p data-reveal className="max-w-md text-sm/6 text-text-secondary">
                Cada crônica aponta para o que muda na preparação, na escolha de sistema ou na
                vida das comunidades de mesa.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {archive.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-section-sm">
        <Container>
          <Reveal>
            <div
              data-reveal
              className="rounded-xl border border-border-brand-soft bg-surface-primary px-6 py-8 shadow-card sm:px-8"
            >
              <ScrollText className="size-6 text-brand-ember" aria-hidden="true" />
              <h2 className="mt-4 max-w-2xl font-display text-display-md font-semibold text-text-primary">
                A redação continua mapeando sinais úteis para quem mestra.
              </h2>
              <p className="mt-2 max-w-2xl text-sm/6 text-text-secondary">
                A newsletter reúne novas crônicas, materiais e avisos importantes da Academia em
                um só envio.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
