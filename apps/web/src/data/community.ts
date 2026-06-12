import type { CommunityFeature } from "@/types/content";

/**
 * Funcionalidades planejadas do módulo de comunidade.
 * Futuramente: tabelas `rpg_tables`, `community_waitlist`, fóruns.
 */
export const communityFeatures: CommunityFeature[] = [
  { id: "com-01", label: "Divulgar sua mesa", icon: "megaphone" },
  { id: "com-02", label: "Encontrar jogadores", icon: "users" },
  { id: "com-03", label: "Publicar materiais", icon: "scroll-text" },
  { id: "com-04", label: "Fóruns por sistema", icon: "swords" },
  { id: "com-05", label: "Grupos por cidade ou online", icon: "map" },
  { id: "com-06", label: "Reputação de mestre", icon: "trophy" },
  { id: "com-07", label: "Eventos e one-shots", icon: "calendar" },
];
