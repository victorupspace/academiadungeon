import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Newspaper, Radio } from "lucide-react";
import { ArtPlaceholder } from "@/components/ui/ArtPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/layout/Container";
import { newsCategoryLabels } from "@/data/news";
import { getPublishedNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { NeonTone, NewsArticle } from "@/types/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryTone: Record<NewsArticle["category"], NeonTone> = {
  mercado: "blue",
  lancamentos: "red",
  sistemas: "purple",
  editoras: "green",
  comunidade: "amber",
};

export function generateStaticParams() {
  return getPublishedNews().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedNews().find((n) => n.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/noticias/${article.slug}` },
  };
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getPublishedNews().find((n) => n.slug === slug);
  if (!article) notFound();

  const body = article.body ?? [
    {
      heading: "Resumo da crônica",
      paragraphs: [article.excerpt],
    },
  ];

  return (
    <main id="conteudo" className="relative overflow-hidden">
      <section className="relative border-b border-border-faint bg-bg-primary pt-[calc(var(--ad-header-height)+3.5rem)]">
        <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-20 h-120 w-120 -translate-x-1/2 rounded-full bg-brand-primary/18 blur-[120px]"
        />

        <Container className="relative pb-14 sm:pb-20">
          <Button href="/noticias" variant="ghost" size="sm" className="-ml-3 mb-8">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Notícias
          </Button>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div>
              <Badge tone={categoryTone[article.category]} dot>
                {newsCategoryLabels[article.category]}
              </Badge>
              <h1 className="mt-6 max-w-4xl text-balance font-display text-display-2xl font-semibold text-text-primary">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base/7 text-text-secondary">
                {article.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border-brand-soft bg-surface-primary shadow-card">
              <div className="aspect-video border-b border-border-faint">
                <ArtPlaceholder variant={article.artVariant} />
              </div>
              <dl className="grid grid-cols-1 gap-0 divide-y divide-border-faint p-5">
                <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <Newspaper className="size-4" aria-hidden="true" />
                    Fonte
                  </dt>
                  <dd className="text-right text-sm font-semibold text-text-primary">
                    {article.source}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <Clock className="size-4" aria-hidden="true" />
                    Leitura
                  </dt>
                  <dd className="text-sm font-semibold text-text-primary">
                    {article.readingTimeMinutes} min
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 pt-3">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <Radio className="size-4" aria-hidden="true" />
                    Publicada
                  </dt>
                  <dd className="text-sm font-semibold text-text-primary">
                    {formatDate(article.publishedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <article className="bg-bg-secondary py-section-sm">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,44rem)_1fr]">
          <div className="space-y-11">
            {body.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-display-md font-semibold text-text-primary">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base/8 text-text-secondary">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm/6 text-text-secondary">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ember" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="lg:pl-6">
            <div className="sticky top-[calc(var(--ad-header-height)+1.5rem)] rounded-xl border border-border-subtle bg-surface-primary p-6 shadow-card">
              <p className="eyebrow">Leitura da redação</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-text-primary">
                Transforme notícia em critério de mesa.
              </h2>
              <p className="mt-3 text-sm/6 text-text-secondary">
                Ao terminar, anote o que muda na sua preparação: uma ferramenta para testar, um
                sistema para estudar ou uma conversa para abrir com o grupo.
              </p>
              <Button href="/#faca-parte" variant="secondary" className="mt-6 w-full">
                Sugerir próximos temas
              </Button>
            </div>
          </aside>
        </Container>
      </article>
    </main>
  );
}
