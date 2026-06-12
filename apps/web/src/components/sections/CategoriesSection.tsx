import { Container } from "@/components/layout/Container";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ConstructionCard } from "@/components/ui/ConstructionCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPlatformCategories } from "@/lib/content";

/**
 * Entradas principais da plataforma (prompt §13): Materiais e Guias,
 * Notícias e Comunidade (selada, em construção) — com índices técnicos.
 */
export function CategoriesSection() {
  const categories = getPlatformCategories();
  const primaryCategories = categories.filter((category) =>
    ["cat-materiais", "cat-guias"].includes(category.id)
  );
  const secondaryCategories = categories.filter(
    (category) => !["cat-materiais", "cat-guias"].includes(category.id)
  );

  return (
    <section aria-labelledby="categorias-title" className="bg-bg-secondary/70 py-8 sm:py-10">
      <Container>
        <Reveal>
          <h2 id="categorias-title" className="sr-only">
            Navegação por áreas do acervo
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {primaryCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={String(index + 1).padStart(2, "0")}
                variant="featured"
                reveal={false}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {secondaryCategories.map((category, index) =>
              category.status === "construction" ? (
                <ConstructionCard
                  key={category.id}
                  category={category}
                  index={String(index + primaryCategories.length + 1).padStart(2, "0")}
                  className="min-h-[14rem]"
                  reveal={false}
                />
              ) : (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={String(index + primaryCategories.length + 1).padStart(2, "0")}
                  className="min-h-[14rem]"
                  reveal={false}
                />
              )
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
