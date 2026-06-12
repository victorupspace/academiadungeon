import {
  BookOpen,
  Calendar,
  Castle,
  Compass,
  Dices,
  Flame,
  Library,
  ListChecks,
  Map,
  Megaphone,
  Newspaper,
  ScrollText,
  Sparkles,
  Swords,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ContentIconName } from "@/types/content";

/**
 * Registry de ícones: o conteúdo persiste nomes (strings, CMS-friendly)
 * e a UI resolve para componentes aqui.
 */
export const contentIcons: Record<ContentIconName, LucideIcon> = {
  "book-open": BookOpen,
  newspaper: Newspaper,
  users: Users,
  "list-checks": ListChecks,
  castle: Castle,
  dices: Dices,
  compass: Compass,
  sparkles: Sparkles,
  "scroll-text": ScrollText,
  map: Map,
  swords: Swords,
  flame: Flame,
  trophy: Trophy,
  calendar: Calendar,
  megaphone: Megaphone,
  library: Library,
};
