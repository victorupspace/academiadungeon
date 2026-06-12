# Academia Dungeon

Hub digital para mestres de RPG — materiais, guias, notícias, cursos e (em breve) comunidade. UI brutalista: base preto/cinza neutro, tipografia Archivo Black expandida em caixa alta, estrutura exposta e um único acento `#A00024`.

> Direção visual completa em [`docs/design.md`](docs/design.md) (v2 — rege toda a implementação).

## Stack

- **Next.js 15 (App Router)** + React 19 + TypeScript estrito
- **Tailwind CSS v4** (config CSS-first consumindo os design tokens)
- **GSAP + @gsap/react** (splash, reveals, header) — CSS para hover/loops
- **React Hook Form + Zod** (newsletter, validação compartilhada client/server)
- **lucide-react** (ícones) · **pnpm workspaces** (monorepo)
- **Supabase**: preparado, não conectado (ver "Backoffice futuro")

## Estrutura do monorepo

```txt
academia-dungeon/
  apps/
    web/            ← site público (Next.js App Router)
  packages/
    tokens/         ← design tokens CSS (fonte única de verdade visual)
    config/         ← tsconfig/prettier compartilhados
    ui/             ← stub da futura lib de componentes (Vite + Storybook)
  docs/
    design.md       ← design system v2 (brutalista)
```

Dentro de `apps/web/src`: `app/` (rotas, SEO, OG image), `components/` (`ui/`, `layout/`, `sections/`), `data/` (mocks estruturados como CMS), `lib/` (animações, acesso a conteúdo, server actions, validação), `types/` (modelos espelhando as tabelas futuras do Supabase).

## Rodando

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção
pnpm typecheck  # tsc -b em todos os pacotes
```

### ⚠️ Este repositório vive num volume Google Drive

O Google Drive não entrega consistência de leitura imediata para os milhares de arquivos que o `next build` escreve em `.next`, o que causa `PageNotFoundError (ENOENT)` na fase "Collecting page data". A solução adotada: **`apps/web/.next` é um symlink para um diretório local** (`~/Library/Caches/academia-dungeon/web-next`). O script `scripts/setup-local-next.sh` (re)cria esse link — rode-o uma vez por máquina:

```bash
./scripts/setup-local-next.sh
```

`node_modules` funciona no Drive (pnpm com `package-import-method=copy` no `.npmrc`), apenas mais lento no install.

## Conteúdo e dados

Os dados são mockados, mas **estruturados como se viessem do CMS**: tipos em `src/types/content.ts` espelham as tabelas futuras (`materials`, `news`, `newsletter_subscribers`, `rpg_tables`…), incluindo o ciclo editorial `draft / in_review / scheduled / published / archived`. Toda leitura passa por `src/lib/content.ts` — quando o Supabase entrar, troca-se a origem nessas funções e nenhum componente muda. A inscrição da newsletter já é uma server action (`src/lib/actions/newsletter.ts`) com o ponto de integração documentado.

## Rotas

`/` é a home completa. `/materiais`, `/guias`, `/noticias`, `/cursos`, `/comunidade`, `/sobre`, `/termos`, `/privacidade` e `/admin` ("Área do Mestre", futuro backoffice) existem como páginas "em construção" na voz da marca — nenhum link do site morre. `/materiais/[slug]` e `/noticias/[slug]` resolvem os mocks por slug (com `generateStaticParams` + metadata). SEO: metadata global + por rota, OG image gerada em runtime, JSON-LD, `robots.ts`, `sitemap.ts`.

## Roadmap

1. **Conteúdo real** — MDX ou Supabase para materiais/notícias;
2. **apps/admin** — backoffice (gestão editorial, status, newsletter), diretrizes em `design.md §21`;
3. **packages/ui** — promover componentes estáveis para a lib Vite + Storybook (critérios no README do pacote);
4. **Comunidade** — mesas, jogadores, fóruns (`rpg_tables`, `community_waitlist`).
