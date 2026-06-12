import Link from "next/link";
import { Instagram, Mail, MessagesSquare, Twitter, Youtube } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, siteConfig, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/content";

const socialIcons: Record<SocialLink["network"], typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  discord: MessagesSquare,
};

const footerLinkClasses = cn(
  "text-sm text-text-muted transition-colors duration-150 hover:text-text-primary"
);

/**
 * Footer (design.md §13): colunas estruturais, wordmark gigante em
 * marca d'água e o acesso discreto à Área do Mestre (/admin).
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-border-strong bg-bg-secondary">
      <Container className="pb-10 pt-14 sm:pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* marca */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Academia Dungeon — início" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm/6 text-text-secondary">
              Um portal para formar, inspirar e equipar mestres de RPG — materiais, guias,
              notícias e, em breve, uma comunidade inteira atrás deste portão.
            </p>
            <ul className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.network];
                return (
                  <li key={social.network}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={cn(
                        "flex size-10 items-center justify-center border border-border-strong",
                        "bg-bg-primary text-text-muted transition-all duration-150",
                        "hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-ember"
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* colunas de navegação */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="font-mono text-2xs font-bold uppercase tracking-eyebrow text-text-muted">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={footerLinkClasses}>
                      {link.label}
                      {link.soon && (
                        <span
                          aria-hidden="true"
                          className="ml-2 inline-block size-1.5 bg-neon-amber/80 align-middle"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* contato */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-2xs font-bold uppercase tracking-eyebrow text-text-muted">
              Contato
            </h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className={cn(footerLinkClasses, "mt-4 inline-flex items-center gap-2")}
            >
              <Mail className="size-4" aria-hidden="true" />
              {siteConfig.contactEmail}
            </a>
            <p className="mt-4 text-xs/5 text-text-muted">
              Dúvidas, parcerias editoriais ou material para a biblioteca? Os corvos chegam mais
              rápido do que você imagina.
            </p>
          </div>
        </div>

        {/* wordmark gigante — marca d'água estrutural */}
        <p
          aria-hidden="true"
          className={cn(
            "mt-14 select-none whitespace-nowrap text-center font-display font-black uppercase leading-[0.8] font-stretch-expanded",
            "text-[clamp(2.4rem,8.6vw,8rem)] tracking-tight text-surface-elevated"
          )}
        >
          Academia<span className="text-brand-accent/40">_</span>Dungeon
        </p>

        <div className="mt-10 border-t border-border-strong pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="font-mono text-2xs uppercase tracking-[0.08em] text-text-muted">
              © {new Date().getFullYear()} {siteConfig.name}
              <span aria-hidden="true">{" // "}</span>
              Todos os direitos reservados
              <span aria-hidden="true">{" // "}</span>
              Forjado nas profundezas
            </p>
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  href="/termos"
                  className="font-mono text-2xs uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text-secondary"
                >
                  Termos
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="font-mono text-2xs uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text-secondary"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                {/* acesso futuro ao backoffice */}
                <Link
                  href="/admin"
                  className="font-mono text-2xs uppercase tracking-[0.08em] text-text-muted/80 transition-colors hover:text-brand-ember"
                >
                  Área do Mestre
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
