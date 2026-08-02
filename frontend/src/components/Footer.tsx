import { Github, Linkedin, Twitter, ShieldCheck } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-primary-foreground">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">Temaxing Scan</span>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            An AI-powered digital trust platform that helps everyone tell safe from suspicious
            online.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <nav aria-label="Social links" className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <social.icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <nav aria-label="Legal" className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#faq" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] border-t border-border pt-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Temaxing Scan. All rights reserved.
      </div>
    </footer>
  );
}
