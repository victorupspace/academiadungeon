import type { NewsArticle } from "@/types/content";

/**
 * Notícias (mock estruturado). Futuramente: tabela `news` no Supabase,
 * com `featured` controlando o destaque editorial da home.
 */
export const newsArticles: NewsArticle[] = [
  {
    id: "news-001",
    slug: "novos-suplementos-reacendem-interesse-por-campanhas-old-school",
    title: "Novos suplementos reacendem o interesse por campanhas old school",
    excerpt:
      "Uma nova leva de suplementos OSR — entre zines independentes e caixas de editoras consolidadas — está trazendo mestres de volta aos hexcrawls, à exploração lenta e à letalidade honesta das mesas clássicas. Mapeamos o que vale a sua atenção.",
    body: [
      {
        heading: "O retorno do procedimento",
        paragraphs: [
          "O interesse por campanhas old school cresce quando mestres procuram jogos que devolvem peso ao tempo, ao mapa e ao risco. A novidade não está apenas na nostalgia, mas na redescoberta de procedimentos que deixam o mundo reagir com menos improviso arbitrário.",
          "Suplementos recentes nessa linha tendem a oferecer tabelas, geradores, facções, mapas abertos e ferramentas que ajudam o mestre a preparar menos roteiro e mais situação.",
        ],
      },
      {
        heading: "O que observar antes de comprar",
        paragraphs: [
          "Um bom material old school precisa ser usável na mesa. Blocos de ambientação longos podem inspirar, mas o valor real aparece quando o livro entrega perigos legíveis, rumores, recompensas e consequências.",
        ],
        bullets: [
          "Mapas com escolhas reais de rota.",
          "Tabelas que produzem situações, não apenas listas de monstros.",
          "Regras de exploração explicadas com exemplos.",
          "Tesouros e segredos que mudam a estratégia do grupo.",
        ],
      },
      {
        heading: "Por que isso importa para mestres",
        paragraphs: [
          "Mesmo mesas que não jogam OSR podem aproveitar essa onda. Procedimentos de exploração, encontros com reação e controle de recursos ajudam qualquer campanha a ganhar textura.",
          "A pergunta central não é se o jogo é antigo ou moderno, mas se ele cria decisões interessantes com ferramentas claras.",
        ],
      },
    ],
    category: "lancamentos",
    tags: ["OSR", "Suplementos", "Zines"],
    source: "Redação Academia Dungeon",
    readingTimeMinutes: 7,
    artVariant: "ember",
    status: "published",
    featured: true,
    publishedAt: "2026-06-09T09:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "news-002",
    slug: "como-dcc-dnd-e-pathfinder-moldam-estilos-de-mestragem",
    title: "Como DCC, D&D e Pathfinder moldam estilos diferentes de mestragem",
    excerpt:
      "O sistema que você escolhe treina o mestre que você se torna. Comparamos como cada mesa distribui preparação, improviso e autoridade narrativa.",
    body: [
      {
        heading: "Sistema também ensina postura",
        paragraphs: [
          "Regras não são apenas resolução de ação. Elas educam o mestre sobre o que observar, quando intervir e que tipo de preparação vale o tempo gasto antes da sessão.",
          "DCC, D&D e Pathfinder podem sustentar fantasia de aventura, mas cada um empurra a mesa para ritmos diferentes.",
        ],
      },
      {
        heading: "Três centros de gravidade",
        paragraphs: [
          "Em DCC, a incerteza e o espanto costumam ficar no centro. Em D&D, a estrutura de aventura e progressão heroica tende a organizar a experiência. Em Pathfinder, a clareza tática e a confiabilidade das opções pedem preparação mais precisa.",
        ],
        bullets: [
          "DCC recompensa surpresa, risco e consequências estranhas.",
          "D&D favorece flexibilidade entre narrativa, combate e exploração.",
          "Pathfinder valoriza leitura de regras, encontros bem calibrados e escolhas mecânicas.",
        ],
      },
      {
        heading: "Escolha pelo tipo de mestre que você quer ser",
        paragraphs: [
          "Não existe sistema neutro. Se você quer improvisar mais, escolha regras que aceitem bordas soltas. Se quer combate tático, escolha um jogo que recompense precisão. Se quer descoberta perigosa, escolha ferramentas que deixem o mapa falar.",
          "O melhor sistema é aquele que reduz atrito no tipo de mesa que você quer conduzir.",
        ],
      },
    ],
    category: "sistemas",
    tags: ["DCC", "D&D", "Pathfinder"],
    source: "Redação Academia Dungeon",
    readingTimeMinutes: 9,
    artVariant: "dice",
    status: "published",
    featured: false,
    publishedAt: "2026-06-05T09:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "news-003",
    slug: "crescimento-dos-clubes-de-rpg-presenciais-e-online",
    title: "O crescimento dos clubes de RPG presenciais e online",
    excerpt:
      "Lojas, bibliotecas e servidores de Discord viraram guildas modernas. O que está por trás da nova onda de clubes — e o que ela muda para quem mestra.",
    body: [
      {
        heading: "A mesa virou infraestrutura social",
        paragraphs: [
          "Clubes de RPG resolvem um problema antigo: encontrar pessoas confiáveis, alinhar expectativas e manter campanhas vivas depois da primeira sessão.",
          "Quando uma comunidade organiza calendário, canais, regras de convivência e espaço para mesas curtas, ela reduz a barreira de entrada para novos jogadores e novos mestres.",
        ],
      },
      {
        heading: "O papel do mestre muda",
        paragraphs: [
          "Em clubes, o mestre deixa de ser apenas anfitrião de uma mesa isolada. Ele passa a fazer parte de um ecossistema: apresenta sistemas, acolhe iniciantes, compartilha materiais e aprende observando outras conduções.",
        ],
        bullets: [
          "Sessões one-shot viram porta de entrada.",
          "Campanhas abertas exigem recapitulação e registro melhores.",
          "Acordos de mesa precisam ser claros antes do jogo.",
          "Rotação de mestres evita dependência de uma única pessoa.",
        ],
      },
      {
        heading: "Comunidade como continuidade",
        paragraphs: [
          "A força de um clube não está apenas em marcar partidas. Está em manter conversa entre elas: relatos, dúvidas, convites, diários de campanha e material compartilhado.",
          "Quando esse fluxo existe, o hobby deixa de depender do acaso.",
        ],
      },
    ],
    category: "comunidade",
    tags: ["Clubes", "Mesas", "Cultura"],
    source: "Redação Academia Dungeon",
    readingTimeMinutes: 5,
    artVariant: "candle",
    status: "published",
    featured: false,
    publishedAt: "2026-05-30T09:00:00.000Z",
    authorId: "author-redacao",
  },
  {
    id: "news-004",
    slug: "ferramentas-digitais-para-preparacao-de-campanhas",
    title: "Ferramentas digitais que ajudam mestres na preparação de campanhas",
    excerpt:
      "De geradores de masmorra a gerenciadores de campanha: testamos as ferramentas que realmente economizam horas de preparação sem engessar a mesa.",
    body: [
      {
        heading: "A ferramenta certa diminui fricção",
        paragraphs: [
          "Ferramentas digitais ajudam quando removem trabalho repetitivo sem decidir a aventura pelo mestre. O ganho real está em organizar referência, gerar sementes, registrar consequências e deixar informação importante fácil de recuperar.",
          "Quando a ferramenta exige mais manutenção do que entrega clareza, ela vira outro caderno para abandonar.",
        ],
      },
      {
        heading: "Categorias que valem testar",
        paragraphs: [
          "Nem toda mesa precisa do mesmo pacote. Comece pelo gargalo que mais atrasa sua preparação.",
        ],
        bullets: [
          "Geradores para nomes, rumores, tesouros e encontros.",
          "Mapas e quadros para relações entre facções.",
          "Notas com links bidirecionais para campanhas longas.",
          "Calendários e rastreadores de tempo para hexcrawls.",
        ],
      },
      {
        heading: "Não terceirize a intenção",
        paragraphs: [
          "Automação acelera a mão, mas não substitui critério. Antes de aceitar qualquer resultado, pergunte que decisão ele cria, que tom reforça e que consequência abre para os jogadores.",
          "A melhor ferramenta desaparece durante a sessão.",
        ],
      },
    ],
    category: "mercado",
    tags: ["Ferramentas", "Preparação"],
    source: "Redação Academia Dungeon",
    readingTimeMinutes: 6,
    artVariant: "map",
    status: "published",
    featured: false,
    publishedAt: "2026-05-26T09:00:00.000Z",
    authorId: "author-redacao",
  },
];

export const newsCategoryLabels: Record<NewsArticle["category"], string> = {
  mercado: "Mercado",
  lancamentos: "Lançamentos",
  sistemas: "Sistemas",
  editoras: "Editoras",
  comunidade: "Comunidade",
};
