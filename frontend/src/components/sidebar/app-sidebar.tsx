import { Link, useLocation } from "react-router-dom";
import {
  History,
  House,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: House,
  },
  {
    title: "Phishing Analysis",
    to: "/dashboard/phishing",
    icon: ShieldCheck,
    subtitle: "Website Scanner",
  },
  {
    title: "Fake News Detection",
    to: "/dashboard/fake-news",
    icon: Newspaper,
  },
  {
    title: "Scan History",
    to: "/dashboard/history",
    icon: History,
  },
];

interface AppSidebarProps {
  onNavigate?: () => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full w-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="grid size-10 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-[var(--shadow-glow)]">
          <Sparkles className="size-5" strokeWidth={2.2} />
        </span>

        <span className="leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight">
            Temaxing Scan
          </span>

          <span className="block text-xs text-muted-foreground">
            AI Threat Intelligence
          </span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5 px-3">
        {navItems.map((item) => {
          const active = pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl border transition-colors",
                  active
                    ? "border-transparent bg-brand text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground group-hover:text-primary"
                )}
              >
                <item.icon className="size-[18px]" strokeWidth={2} />
              </span>

              <span className="min-w-0 pt-0.5">
                <span className="block truncate text-sm font-medium">
                  {item.title}
                </span>

                {item.subtitle && (
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="m-3 rounded-2xl border border-border bg-muted/60 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">
          Temaxing Scan
        </p>

        <p className="text-xs text-muted-foreground">
          Version 1.0
        </p>
      </div>
    </div>
  );
}