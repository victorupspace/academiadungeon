import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  /** Colunas no desktop; sempre 1 coluna no mobile (design.md §11). */
  cols?: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}

const colClasses: Record<NonNullable<GridProps["cols"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ cols = 3, className, children }: GridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-5 lg:gap-6", colClasses[cols], className)}>
      {children}
    </div>
  );
}
