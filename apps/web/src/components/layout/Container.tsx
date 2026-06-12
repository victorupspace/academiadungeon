import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}

/**
 * Container central (design.md §11): max 1280px, padding lateral fluido.
 * Em ultrawide o container não cresce — a atmosfera preenche o resto.
 */
export function Container({ as: Tag = "div", className, children, id }: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[var(--ad-container-max)] px-container", className)}>
      {children}
    </Tag>
  );
}
