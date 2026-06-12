# Academia Dungeon — Design System

> **Versão 2.0 (brutalista)** · Junho 2026 · Rege `apps/web` e todos os produtos futuros (admin, ui, cursos, comunidade).
> Tokens implementados em `packages/tokens/css/tokens.css`. Este documento é a intenção; os tokens são a execução.
> A v1 ("dark fantasy suave": vinho/marsala difuso, serif editorial, glows, cantos arredondados) foi **descontinuada por decisão de produto** — não reintroduzir seus padrões.

---

## 1. Visão de marca

A **Academia Dungeon** é um portal para formar, inspirar e equipar mestres de RPG. A referência de mercado é o porte editorial de dungeonsanddragons.com; a linguagem é **brutalista**:

- **A dungeon** — pedra, escuridão, estrutura à mostra, o portão que esconde algo valioso;
- **A academia** — rigor técnico, índices, fichas, catalogação;
- **A mesa** — ritual coletivo, dados na madeira, decisão seca.

A interface é um **documento técnico de uma guilda**: grades visíveis, carimbos, réguas, índices numerados — atravessado por uma única cor de sangue.

**Personalidade:** direta, pesada, confiante, precisa. Nada decorativo sem função estrutural.

**Anti-referências (o que nunca ser):** fantasia medieval caricata, template SaaS suave, glassmorphism, glows difusos, gradientes coloridos, cantos arredondados "friendly", excesso de vermelho.

## 2. Princípios visuais

1. **Preto e cinza são o mundo; crimson é o sangue.** A base é neutra (`#060607` → `#1B1B1F`). O `#A00024` aparece pouco e com intenção: blobs, CTAs, fios, marcas, estados ativos. Se há crimson em mais de ~10% do viewport, está errado.
2. **Estrutura exposta.** Bordas de 1–2px visíveis, regras entre seções, divisores internos, réguas com índices. O esqueleto da página é parte da estética.
3. **Tipografia é a imagem.** Display Archivo Black expandida em caixa alta, tamanho de cartaz. Uma linha pode ser vazada (contorno) ou crimson para hierarquia. Mono (Space Mono) para tudo que é meta: eyebrows, datas, índices, labels.
4. **Cantos retos, sombras duras.** Radius 0 em tudo (exceto dots de status). Profundidade = sombra offset sólida (`6px 6px 0 #A00024`), nunca blur.
5. **Blobs como contraponto orgânico.** Manchas radiais desfocadas em crimson flutuam atrás da grade rígida — a única coisa "macia" do sistema. Máximo 2 por viewport.
6. **Movimento seco.** Durações curtas (100–320ms), deslocamentos pequenos, easing duro. O marquee e o pulso de status são os únicos loops.
7. **Mobile é nativo.** Cartazes tipográficos escalam por `clamp()`, coleções viram trilhos horizontais, réguas empilham com divisores. Nada "espremido".

## 3. Paleta de cores

### Base neutra

| Papel | Token | Hex |
|---|---|---|
| Fundo principal | `--ad-color-bg-primary` | `#060607` |
| Fundo secundário | `--ad-color-bg-secondary` | `#0A0A0C` |
| Fundo terciário | `--ad-color-bg-tertiary` | `#101013` |
| Surface primária | `--ad-color-surface-primary` | `#0E0E10` |
| Surface secundária | `--ad-color-surface-secondary` | `#141417` |
| Surface elevada | `--ad-color-surface-elevated` | `#1B1B1F` |

### Acento (único)

| Papel | Token | Hex | Uso |
|---|---|---|---|
| **Acento** | `--ad-color-brand-accent` | `#A00024` | CTAs, fios, blobs, bordas ativas, blocos pequenos |
| Acento claro | `--ad-color-brand-secondary` | `#C8102E` | hover de CTA; texto display grande (≥3:1) |
| Ember | `--ad-color-brand-ember` | `#F23A56` | **única** opção para texto pequeno em tom de marca (≥4.5:1) |
| Acento profundo | `--ad-color-brand-primary` | `#5E0013` | profundidade de blobs |

⚠️ `#A00024` cru **não passa contraste para texto** sobre preto — é cor de superfície/borda/bloco. Texto pequeno usa `ember`; display grande pode usar `brand-secondary`.

### Texto

| Papel | Token | Hex | Contraste sobre bg |
|---|---|---|---|
| Primário | `--ad-color-text-primary` | `#F4F4F5` | ~18:1 |
| Secundário | `--ad-color-text-secondary` | `#B6B6BC` | ~10:1 |
| Muted | `--ad-color-text-muted` | `#82828C` | ~4.5:1 (piso; nunca abaixo) |

### Bordas

`--ad-color-border-strong` `#2C2C32` (a regra estrutural padrão — visível de propósito) · `subtle` `rgba(255,255,255,.14)` · `faint` `rgba(255,255,255,.07)` (divisores internos) · `brand` `#A00024` (ativo/hover) · `brand-soft` `rgba(160,0,36,.45)`.

### Neon (somente status)

`green #A7FF83 · blue #72E8FF · purple #C084FC · amber #FFD166 · red #FF4D6D`

Semântica fixa: **green** preparação/sucesso · **blue** sistemas/info · **purple** worldbuilding/arcano · **amber** em construção/aviso · **red** destaque editorial/erro. Permitido apenas em dots (≤8px), texto de badge/tag e ícones ≤16px. Proibido em fundos, botões e texto corrido.

## 4. Tokens de cor

Implementados em `packages/tokens/css/tokens.css` com prefixo `--ad-`; mapeados para utilities Tailwind v4 via `@theme inline` em `apps/web/src/app/globals.css` (`bg-bg-primary`, `border-border-strong`, `text-brand-ember`, `bg-brand-accent`…).

**Regra:** componente nunca usa hex cru. Valor novo nasce primeiro no pacote de tokens e neste documento.

## 5. Tokens de tipografia

| Token | Valor | Uso |
|---|---|---|
| `--ad-font-display` | Archivo (variável, wght+wdth) | cartazes: Black + `font-stretch-expanded` + uppercase |
| `--ad-font-sans` | Archivo | UI, corpo, botões |
| `--ad-font-mono` | Space Mono | eyebrows, índices, datas, labels, meta |
| `--ad-text-display-2xl` | `clamp(3.1rem → 7.5rem)` · lh 0.92 | cartaz do hero |
| `--ad-text-display-xl` | `clamp(2.3rem → 4.6rem)` · lh 0.96 | títulos de seção |
| `--ad-text-display-lg` | `clamp(1.85rem → 3.1rem)` · lh 1.02 | painéis (newsletter, manifesto) |
| `--ad-text-display-md` | `clamp(1.4rem → 2rem)` · lh 1.08 | título de notícia em destaque |
| `--text-2xs` | `0.6875rem` | labels mono mínimos |
| `--ad-tracking-eyebrow` | `0.2em` | eyebrows mono uppercase |
| `--ad-tracking-label` | `0.1em` | botões e labels |

Receita do display: `font-display font-black uppercase font-stretch-expanded text-display-*`. Variações de hierarquia dentro de um cartaz: linha sólida branca, linha **vazada** (`.text-outline`) e linha em `brand-secondary` — no máximo uma de cada por cartaz.

Regras: mono nunca em parágrafos longos; corpo Inter-like (Archivo normal) `1rem/1.7` em `text-secondary`, máx `65ch`; títulos de card em sans bold sentence case (caps só em display e categoria).

## 6. Tokens de espaçamento

| Token | Valor | Uso |
|---|---|---|
| `--ad-space-section` | `clamp(4.5rem → 8rem)` | ritmo vertical de seções |
| `--ad-space-section-sm` | `clamp(3rem → 5rem)` | seções compactas |
| `--ad-space-container` | `clamp(1.25rem → 3rem)` | padding lateral |

Ritmo interno de card: padding `1.5rem`/`1.75rem`; gap entre cards `1.25–1.5rem`; rodapés de card sempre separados por regra `border-faint`.

## 7. Tokens de radius

**Tudo 0.** `xs…2xl = 0px`; `full = 9999px` existe apenas para dots de status. Pílulas, cantos arredondados e círculos decorativos são proibidos. O detalhe de forma da casa é o **canto chanfrado** (`.clip-notch`, 45°) em painéis de destaque — usar com parcimônia (1 por viewport).

## 8. Tokens de sombras

| Token | Valor | Uso |
|---|---|---|
| `--ad-shadow-hard` | `4px 4px 0 #2C2C32` | hover de botões |
| `--ad-shadow-hard-accent` | `6px 6px 0 #A00024` | hover de cards |
| `--ad-shadow-hard-accent-lg` | `10px 10px 0 #A00024` | painéis hero |
| `--ad-shadow-elevated` | `0 16px 40px rgba(0,0,0,.7)` | menus/drawer (única sombra difusa permitida) |

Sombra dura sempre acompanha deslocamento do bloco (`translate(-2px,-2px)` a `(-4px,-4px)`); no `active`, bloco volta e sombra some. Glows difusos coloridos são proibidos — a exceção controlada são os **blobs** (atmosfera, nunca em componentes).

## 9. Tokens de borders

Espessuras: `hairline 1px` (divisores internos) · `thin 1.5px` (inputs, botões secundários) · `thick 2px` (regras de seção, foco) · `heavy 3px` (reservado). Estados: repouso `border-strong`; hover/ativo `border-brand` (#A00024). Tracejado proibido. A **listra de risco** (`.hazard-strip`, 135°, crimson/transparente) marca módulos selados.

## 10. Tokens de motion

| Token | Valor | Uso |
|---|---|---|
| `--ad-duration-fast` | 100ms | hover de links/tags |
| `--ad-duration-base` | 180ms | hover de cards/botões |
| `--ad-duration-slow` | 320ms | drawer, trocas de filtro |
| `--ad-duration-slower` | 560ms | reveals de seção, splash |
| `--ad-ease-out` | `cubic-bezier(.2,0,0,1)` | transições CSS |
| `--ad-ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | GSAP reveals |
| `--ad-ease-in-out` | `cubic-bezier(.7,0,.2,1)` | portões da splash |

GSAP (`src/lib/animations.ts`) = narrativa: splash, entrada do hero, scroll reveals, header. CSS = estado e loops: hover, marquee, pulso de dot, deriva de blob. Tudo respeita `prefers-reduced-motion` (GSAP via `matchMedia`; CSS via media query). Só `transform`/`opacity`; zero layout shift.

## 11. Grid system

- Container `max-width 1280px` + padding fluido; em ultrawide o fundo (grade, blobs) preenche, o container não cresce;
- 12 colunas no desktop (hero copy 5 / vídeo 7; comunidade 7/5; notícias 2 colunas iguais);
- Coleções: `1 col` → `2` (`sm`) → `3` (`lg`); gaps `1.25–1.5rem`;
- **Réguas**: faixas full-width com `border-y-2 border-strong` e células divididas (`divide-x-2`) para stats e indicadores;
- Notícias secundárias são **linhas de índice** (grid `data | categoria | título | ↗`), não cards.

## 12. Regras de responsividade

Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 · 3xl 1728`. Suporte real desde **320px**.

- Display sempre `clamp()`; cartaz do hero nunca quebra palavra;
- Filtros/tags viram trilho horizontal `.scroll-x` com fade lateral; nunca 3+ linhas no mobile;
- Réguas de stats empilham com `divide-y-2`;
- Linhas de notícia colapsam para 2 colunas (título + seta) abaixo de `sm`;
- CTAs full-width até `sm`; toque ≥44px;
- Header colapsa para menu full-screen abaixo de `lg`;
- `overflow-x` proibido: blobs/decorações em pais `overflow-hidden`.

## 13. Componentes base

| Componente | Arquivo | Notas |
|---|---|---|
| `Logo` | `ui/Logo.tsx` | sigilo do portão, traço de terminação reta, `currentColor`; wordmark empilhada caps |
| `Button` | `ui/Button.tsx` | blocos retos `primary / secondary / ghost`; hover = deslocamento + sombra dura |
| `Badge` | `ui/Badge.tsx` | selo mono caps com dot quadrado; tons neon semânticos |
| `Tag` | `ui/Tag.tsx` | chip quadrado mono de contorno |
| `Card` | `ui/Card.tsx` | placa `border-strong` + `surface-primary`; hover desloca + `shadow-hard-accent` |
| `SectionHeader` | `ui/SectionHeader.tsx` | índice (`01 //`) + eyebrow mono + display caps + regra de fechamento |
| `Reveal` | `ui/Reveal.tsx` | scroll reveal GSAP via `[data-reveal]`, com fallback de visibilidade |
| `VideoFrame` | `ui/VideoFrame.tsx` | painel 16:9 chanfrado com placa deslocada, chrome técnico e cena-fallback |
| `Marquee` | `ui/Marquee.tsx` | letreiro mono entre seções; pausa no hover; congela em reduced-motion |
| `Grid` | `ui/Grid.tsx` | grid responsivo padrão |
| `CategoryCard / ConstructionCard / ContentCard / NewsCard` | `ui/*` | artefatos especializados (§19) |
| `ArtPlaceholder` | `ui/ArtPlaceholder.tsx` | arte procedural neutra com barra de acento e rótulo técnico |
| `NewsletterForm` | `ui/NewsletterForm.tsx` | RHF + Zod, estados completos (§16) |
| `Container / Header / MobileMenu / Footer / SectionDivider / ComingSoon` | `layout/*` | casca estrutural |

Todos: TypeScript estrito, estados hover/focus/active/disabled, a11y por padrão.

## 14. Estados de interação

- **Hover (card):** `translate(-4px,-4px)` + borda → `#A00024` + `shadow-hard-accent`; setas `→/↗` deslocam 2–4px; 180–200ms.
- **Hover (botão primário):** `translate(-2px,-2px)` + `shadow-hard` + fundo → `brand-secondary`; **secundário:** idem com borda → accent; **ghost (mono):** texto → ember.
- **Active:** bloco volta ao lugar, sombra desaparece — "carimbo".
- **Focus:** `outline 2px #F23A56` offset 3px, sempre visível; inputs trocam para borda accent.
- **Disabled:** opacidade 0.45, sem hover, cursor not-allowed.
- **Loading:** spinner quadrado (borda girando) herdando `currentColor`; largura do botão estável; `aria-busy`.

## 15. Estados vazios

- Painel com a mesma `border-strong` da listagem (o layout não colapsa);
- Ícone da casa em `text-muted`; título curto em mono caps na voz da marca ("Nenhum material nesta ala — ainda.");
- Ação clara de recuperação (limpar filtro, voltar).

## 16. Estados de loading

- **Splash:** 1×/sessão (sessionStorage); portões sólidos se abrem após o sigilo desenhar;
- **Skeletons (futuro):** blocos `surface-secondary` retos com shimmer cinza 6% — mesmo footprint do conteúdo real;
- **Formulários:** botão `loading` com spinner + "Abrindo o portão…"; campos desabilitados;
- **Newsletter:** `idle → loading → success | error`; validação Zod inline; `aria-live="polite"`; erro recuperável.

## 17. Regras de acessibilidade

- Contraste AA: texto normal ≥4.5:1 (`text-muted` é o piso), display grande ≥3:1 (`brand-secondary` só em display);
- Foco visível em todos os interativos; navegação por teclado completa; ESC fecha o menu;
- Menu mobile: `role="dialog"`, `aria-modal`, trap de foco, foco devolvido ao gatilho, scroll lock;
- 1 `h1` por página; seções com `h2`; landmarks `header/nav/main/footer`; skip-link primeiro foco;
- Marquee e blobs são `aria-hidden` (decorativos); ícones funcionais com `aria-label`;
- Formulários: `label` visível, `aria-invalid`, erros via `aria-describedby` + `role="alert"`;
- `prefers-reduced-motion`: splash vira fade, reveals desligam, marquee/blob/pulso congelam;
- Toque ≥44px no mobile.

## 18. Diretrizes para imagens e vídeos

- Toda mídia vive em **painel reto** com `border-strong` (1.5–2px); destaque ganha canto chanfrado e/ou placa de fundo deslocada;
- `aspect-ratio` declarado sempre (vídeo 16:9; arte de notícia 16:9; thumbnails quadradas);
- Vídeos: `muted`, `playsInline`, `preload="metadata"`, `poster`; **fallback obrigatório** — a cena do portão (grade + sigilo + fenda crimson), nunca um retângulo quebrado;
- Fotografia futura: dessaturada, sombras profundas, luz dura; overlay de vinheta ≥20% na base quando houver texto sobreposto;
- Lazy loading por padrão, exceto above-the-fold.

## 19. Diretrizes para cards

Anatomia (ordem): **meta técnica** (categoria com dot + tempo mono) → **título** (sans bold, 2 linhas máx) → **excerto** (2–3 linhas) → **tags** (máx 3; categoria de ala máx 4 + contador) → **rodapé com regra** (`border-faint`) contendo status + ação mono caps com seta.

- Card inteiro clicável (um único stretched link no título);
- `CategoryCard`: índice `/01` mono ember no topo + seta ↗ reativa; é a porta de ala;
- `ConstructionCard`: listra de risco no topo, cadeado, conteúdo a 60%, CTA inerte — deliberado, nunca "quebrado";
- `ContentCard`: denso, ícone em caixa quadrada, meta completa;
- `NewsCard`: `featured` (arte 16:9 + display caps) e `row` (linha de índice editorial);
- Proibido: card sem hover, 4+ tags em ContentCard, 2 CTAs primários, cantos arredondados.

## 20. Diretrizes para badges, tags e labels

- **Badge:** bloco reto, mono bold caps ≤10px, fundo = neon a 10%, borda 30%, dot **quadrado** com pulso lento; máx 1 por artefato; semântica de cor fixa (§3);
- **Tag:** chip quadrado de contorno (`border-strong`), mono caps 11px, sem fundo; neon apenas para status/sistema;
- **Eyebrow:** mono bold caps, tracking 0.2em, `text-muted`, prefixado por `//` (e índice `01 //` quando abre seção numerada);
- **Índices:** toda lista/seção importante é numerada (`/01`, `02 //`) em mono ember — é a assinatura tipográfica da casa;
- Nunca misturar badge e tag no mesmo cluster.

## 21. Diretrizes para futuras telas administrativas

O backoffice (`apps/admin`) herda os tokens com densidade maior:

- Fonte base 13–14px; paddings −25%; tabelas com linhas `border-faint` e cabeçalhos mono caps;
- Display caps apenas no título da página; zero blobs e zero marquee — admin é ferramenta;
- Cores de status de conteúdo (fixas): `draft` muted · `in_review` blue · `scheduled` purple · `published` green · `featured` amber · `archived` red/40%;
- Formulários: labels mono caps acima do campo; validação Zod compartilhada; erros inline;
- Sidebar `bg-secondary`, item ativo com barra de 2px em `#A00024` + `surface-elevated`;
- Sombras duras só em botões; tabelas e cards planos.

---

## Apêndice A — Direção da logo

**Conceito:** o portão da dungeon como sigilo geométrico — arco externo, vão interno, fenda central de luz, runa quadrada como pedra angular, soleira dupla. Terminações de traço **retas** (`strokeLinecap="square"`).

- Single color via `currentColor`: branco sobre preto no header; crimson no favicon/momentos de marca; a fenda pode acender em `#A00024` isoladamente;
- Wordmark: "ACADEMIA / DUNGEON" empilhada, Archivo Black caps, tracking 0.16em, "DUNGEON" em ember;
- Funciona de 16px (favicon: arco + soleira) a 280px (splash).

## Apêndice B — Detalhes ambientais

Camadas (todas `pointer-events: none`, `aria-hidden`):

1. `bg-primary` sólido — sem gradientes de fundo;
2. **Grade técnica** (`.dungeon-grid`): linhas 1px brancas a 3.5%, células 64px, mask radial;
3. **Blobs** (`.blob` / `.blob-drift`): radiais crimson desfocados, máx 2 por viewport, deriva lenta;
4. **Grain** (`.grain-overlay`): turbulência a 5%, fixa;
5. **Regras**: `.rune-divider` (1px `border-strong` + tique quadrado crimson central); regras de seção `border-y-2`;
6. **Marquee**: faixa mono entre hero e conteúdo;
7. **Listra de risco** (`.hazard-strip`) e **carimbos vazados** (`.text-outline-faint`) nos módulos selados.

Orçamento por viewport: 2 blobs + 1 grade + grain. Acima disso, polui.

## Apêndice C — Voz e microcopy

- Português brasileiro, segunda pessoa, mentor veterano: direto, seco, caloroso no conteúdo — técnico no chrome;
- O chrome da interface fala em **mono caps** com `//` e `_` ("AD_001", "REC_00:00:00", "// Arquivo completo em /noticias");
- Vocabulário: *portão, ala, salão, selada, forjado, ritual, grimório, mesa, sessão, campanha, registro*;
- Estados: sucesso "Acesso concedido. O portão abriu." · erro "O ritual falhou. Tente de novo." · em construção "Ainda selada atrás da porta.";
- Proibido: lorem ipsum, hype corporativo, gírias forçadas.
