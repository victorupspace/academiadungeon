import type { Author, Material, MaterialCategory } from "@/types/content";

/**
 * Biblioteca de materiais e guias (mock estruturado).
 * Futuramente: tabelas `materials` + `material_categories` no Supabase,
 * consumidas pela mesma camada de acesso em `src/lib/content.ts`.
 */

export const authors: Author[] = [
  {
    id: "author-redacao",
    name: "Redação Academia Dungeon",
    role: "Conselho de Mestres",
  },
];

export const materialCategories: MaterialCategory[] = [
  { slug: "preparacao", label: "Preparação", tone: "green" },
  { slug: "worldbuilding", label: "Worldbuilding", tone: "purple" },
  { slug: "narrativa", label: "Narrativa", tone: "red" },
  { slug: "ferramentas", label: "Ferramentas", tone: "blue" },
  { slug: "old-school", label: "Old School", tone: "amber" },
];

export const materials: Material[] = [
  {
    id: "mat-001",
    slug: "checklist-de-preparacao-para-uma-sessao-brutal",
    title: "Checklist de preparação para uma sessão brutal",
    excerpt:
      "Os 12 itens que separam uma sessão improvisada às pressas de uma noite que seus jogadores vão comentar na semana inteira — do gancho de abertura ao fechamento.",
    body: [
      {
        heading: "Antes de abrir a porta",
        paragraphs: [
          "Uma boa sessão brutal não depende de preparar quarenta páginas. Ela nasce de escolhas claras: qual pressão move a noite, que informação os personagens precisam descobrir e qual custo aparece quando eles hesitam.",
          "Use este checklist como uma varredura final. Se um item estiver fraco, ajuste a mesa antes de aumentar o volume de conteúdo.",
        ],
        bullets: [
          "Defina o perigo central em uma frase.",
          "Escreva uma abertura jogável, não uma introdução lida.",
          "Separe três pistas que apontem para o mesmo problema.",
          "Prepare uma consequência para demora, barulho ou indecisão.",
        ],
      },
      {
        heading: "Durante a sessão",
        paragraphs: [
          "A preparação serve para dar confiança, não para prender a mesa. Quando os jogadores escolherem um caminho inesperado, volte aos elementos essenciais: perigo, pista, custo e recompensa.",
          "O ritmo melhora quando cada cena termina com uma nova decisão. Evite cenas que apenas confirmam o que o grupo já sabe.",
        ],
      },
      {
        heading: "Fechamento que permanece",
        paragraphs: [
          "Reserve cinco minutos para mostrar como o mundo reagiu. Uma porta ficou aberta, uma facção percebeu algo, um aliado mudou de atitude ou um rumor novo corre pela taverna.",
          "Esse pequeno epílogo transforma sessões isoladas em campanha viva.",
        ],
      },
    ],
    category: "preparacao",
    tags: ["Checklist", "Sessão", "Ritual"],
    readingTimeMinutes: 8,
    difficulty: "iniciante",
    icon: "list-checks",
    status: "published",
    featured: true,
    publishedAt: "2026-06-02T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-002",
    slug: "como-criar-uma-dungeon-memoravel",
    title: "Como criar uma dungeon memorável",
    excerpt:
      "Estrutura, ecologia, segredos e ritmo: o método completo para desenhar dungeons que contam histórias por conta própria — sem virar um corredor de combates.",
    body: [
      {
        heading: "Comece pela promessa",
        paragraphs: [
          "Antes do mapa, escolha a promessa da dungeon. Ela pode ser uma pergunta, uma ameaça ou uma tentação: quem construiu este lugar, por que ele ainda respira, o que acontece se ninguém entrar?",
          "A promessa evita salas intercambiáveis. Cada porta passa a reforçar a identidade do lugar.",
        ],
      },
      {
        heading: "Ecologia antes de encontro",
        paragraphs: [
          "Monstros, armadilhas e tesouros ficam mais memoráveis quando parecem pertencer ao mesmo ecossistema. Pense em rotas de patrulha, fontes de água, zonas abandonadas, lugares sagrados e marcas de conflitos antigos.",
          "Nem toda sala precisa de combate. Algumas devem ensinar o grupo a ler a dungeon.",
        ],
        bullets: [
          "Inclua pelo menos uma rota alternativa entre áreas importantes.",
          "Deixe sinais visíveis antes de perigos letais.",
          "Misture recompensas materiais, informacionais e posicionais.",
          "Tenha uma mudança de estado quando o grupo fizer muito barulho.",
        ],
      },
      {
        heading: "Segredos que mudam escolhas",
        paragraphs: [
          "Um segredo bom altera decisão. Ele revela uma passagem, muda a lealdade de um NPC, torna um monstro negociável ou mostra que o tesouro tem dono.",
          "Se a descoberta não altera o plano dos jogadores, talvez seja apenas decoração.",
        ],
      },
    ],
    category: "worldbuilding",
    tags: ["Dungeon", "Mapas", "Design"],
    readingTimeMinutes: 14,
    difficulty: "intermediario",
    icon: "castle",
    status: "published",
    featured: true,
    publishedAt: "2026-05-28T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-003",
    slug: "tabelas-aleatorias-para-encontros-sombrios",
    title: "Tabelas aleatórias para encontros sombrios",
    excerpt:
      "Trinta entradas de encontros, presságios e complicações prontas para rolar na mesa — caladas o suficiente para caber em qualquer cenário de horror ou fantasia sombria.",
    body: [
      {
        heading: "Como rolar sem quebrar o clima",
        paragraphs: [
          "Tabelas aleatórias funcionam melhor quando reforçam o tom da campanha. Role quando o grupo atravessar um trecho perigoso, quando fizer barulho demais ou quando o relógio da aventura pedir movimento.",
          "O resultado não precisa cair do céu. Interprete a entrada como presságio, rastro, rumor, consequência ou encontro direto.",
        ],
      },
      {
        heading: "d6 presságios imediatos",
        paragraphs: [
          "Use esta amostra quando precisar de uma pista sombria sem comprometer a cena inteira.",
        ],
        bullets: [
          "Velas apagam ao mesmo tempo, mas a sala continua quente.",
          "Pegadas molhadas atravessam pedra seca e somem na parede.",
          "Um sino distante toca uma vez para cada personagem.",
          "A comida apodrece dentro das mochilas mais antigas.",
          "Um mapa recente mostra uma porta que ninguém viu.",
          "O próximo NPC chama um personagem por um nome que ele nunca usou.",
        ],
      },
      {
        heading: "Transforme resultado em escolha",
        paragraphs: [
          "Depois do presságio, ofereça uma decisão concreta: investigar, acelerar, recuar, gastar recurso, negociar ou aceitar risco.",
          "A tabela cria movimento; a escolha cria jogo.",
        ],
      },
    ],
    category: "ferramentas",
    tags: ["Tabelas", "Encontros", "d30"],
    readingTimeMinutes: 6,
    difficulty: "iniciante",
    icon: "dices",
    status: "published",
    featured: false,
    publishedAt: "2026-05-21T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-004",
    slug: "guia-rapido-para-mestres-iniciantes",
    title: "Guia rápido para mestres iniciantes",
    excerpt:
      "Sua primeira vez atrás do escudo: o que preparar, o que ignorar, como abrir a sessão e o que fazer quando o plano desmorona aos cinco minutos de jogo.",
    body: [
      {
        heading: "Prepare o que aparece na mesa",
        paragraphs: [
          "O primeiro erro comum é preparar longe demais. Para uma sessão inicial, você precisa de uma situação clara, alguns lugares interessantes, nomes de apoio e problemas que reajam aos personagens.",
          "Não tente prever soluções. Prepare obstáculos compreensíveis e deixe o grupo inventar o caminho.",
        ],
        bullets: [
          "Uma frase de premissa.",
          "Três NPCs com desejo simples.",
          "Três locais com algo para tocar, quebrar ou descobrir.",
          "Uma ameaça que piora se ninguém agir.",
        ],
      },
      {
        heading: "Abra jogando",
        paragraphs: [
          "Comece a sessão com uma decisão em andamento. Em vez de explicar toda a cidade, coloque os personagens diante de uma porta, uma acusação, uma fuga ou uma proposta perigosa.",
          "Contexto pode entrar em doses pequenas quando os jogadores perguntarem.",
        ],
      },
      {
        heading: "Quando o plano cair",
        paragraphs: [
          "Improviso não é inventar tudo do nada. É recombinar o que você preparou. Troque nomes, mova pistas, antecipe consequências e mantenha a lógica do mundo.",
          "Se precisar de tempo, diga que vai pensar por alguns segundos. A mesa aguenta silêncio melhor do que uma resposta apressada que quebra a ficção.",
        ],
      },
    ],
    category: "narrativa",
    tags: ["Fundamentos", "Primeira mesa", "Mesa"],
    readingTimeMinutes: 10,
    difficulty: "iniciante",
    icon: "compass",
    status: "published",
    featured: false,
    publishedAt: "2026-05-14T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-005",
    slug: "como-improvisar-sem-perder-consistencia",
    title: "Como improvisar sem perder consistência",
    excerpt:
      "Técnicas de improviso que mantêm o mundo coerente: âncoras de cena, NPCs reaproveitáveis e como dizer sim sem quebrar a campanha que você levou meses construindo.",
    body: [
      {
        heading: "Improviso precisa de âncoras",
        paragraphs: [
          "Consistência vem de repetir princípios, não de decorar cada detalhe. Defina âncoras para a campanha: temas, limites de magia, facções em conflito, custos recorrentes e sinais visuais do mundo.",
          "Quando surgir uma pergunta inesperada, responda de acordo com essas âncoras.",
        ],
      },
      {
        heading: "Diga sim com custo",
        paragraphs: [
          "Dizer sim não significa remover fricção. Uma boa concessão abre caminho e introduz preço: tempo, barulho, recurso, favor, exposição ou consequência moral.",
          "Essa técnica preserva agência sem transformar a campanha em uma sequência de portas destrancadas.",
        ],
        bullets: [
          "Sim, mas alguém percebe.",
          "Sim, se vocês gastarem tempo.",
          "Sim, ao custo de um recurso raro.",
          "Sim, e isso muda a relação com uma facção.",
        ],
      },
      {
        heading: "Recicle com elegância",
        paragraphs: [
          "NPCs, salas e pistas que não apareceram ainda não foram desperdiçados. Renomeie, reposicione e adapte.",
          "A mesa só conhece o que entrou em cena. Use isso como ferramenta de design, não como desculpa para improviso descuidado.",
        ],
      },
    ],
    category: "narrativa",
    tags: ["Improviso", "NPCs", "Ritmo"],
    readingTimeMinutes: 12,
    difficulty: "veterano",
    icon: "sparkles",
    status: "published",
    featured: false,
    publishedAt: "2026-05-07T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-006",
    slug: "ferramentas-para-campanhas-old-school",
    title: "Ferramentas para campanhas old school",
    excerpt:
      "Hexcrawls, reação de monstros, moral, recursos e tempo: o arsenal de procedimentos que faz o jogo old school girar sozinho — com fichas de referência para imprimir.",
    body: [
      {
        heading: "Procedimento cria liberdade",
        paragraphs: [
          "Campanhas old school ficam vivas quando o mestre não decide tudo por intuição. Procedimentos simples para tempo, luz, recursos, encontro, reação e moral fazem o mundo responder sem favorecer ninguém.",
          "A mesa passa a enxergar risco como informação jogável.",
        ],
      },
      {
        heading: "O kit mínimo",
        paragraphs: [
          "Você não precisa adotar todos os subsistemas de uma vez. Comece por quatro ferramentas e deixe o grupo aprender o ritmo.",
        ],
        bullets: [
          "Turno de exploração para marcar tempo e tochas.",
          "Teste de reação antes de assumir combate.",
          "Moral para criaturas que querem sobreviver.",
          "Tabela de encontros conectada ao território.",
        ],
      },
      {
        heading: "Letalidade honesta",
        paragraphs: [
          "O objetivo não é punir personagens, é sinalizar perigo com antecedência suficiente para que escolhas importem. Rumores, rastros, corpos antigos e arquitetura dizem mais do que um aviso fora do jogo.",
          "Quando o risco é legível, fugir também vira vitória.",
        ],
      },
    ],
    category: "old-school",
    tags: ["OSR", "DCC", "Procedimentos"],
    readingTimeMinutes: 9,
    difficulty: "intermediario",
    icon: "scroll-text",
    status: "published",
    featured: false,
    publishedAt: "2026-04-30T12:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "mat-007",
    slug: "bestiario-de-vilas-assombradas",
    title: "Bestiário de vilas assombradas",
    excerpt:
      "Ainda em revisão pelo conselho — oito criaturas folclóricas brasileiras adaptadas para mesas de fantasia sombria.",
    category: "worldbuilding",
    tags: ["Bestiário", "Folclore"],
    readingTimeMinutes: 11,
    difficulty: "intermediario",
    icon: "flame",
    status: "in_review",
    featured: false,
    publishedAt: "2026-06-20T12:00:00.000Z",
    authorId: "author-redacao",
  },
];
