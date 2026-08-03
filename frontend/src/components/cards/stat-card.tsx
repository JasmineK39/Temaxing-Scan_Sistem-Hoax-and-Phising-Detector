import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  trend,
  up,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  icon: LucideIcon;
  tone: "primary" | "safe" | "medium" | "high";
}) {
  const tones = {
    primary: "bg-primary/8 text-primary",
    safe: "bg-risk-safe/10 text-risk-safe",
    medium: "bg-risk-medium/12 text-risk-medium",
    high: "bg-risk-high/10 text-risk-high",
  } as const;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex items-start justify-between">
        <span className={cn("grid size-10 place-items-center rounded-2xl", tones[tone])}>
          <Icon className="size-[18px]" strokeWidth={2.1} />
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium tabular-nums",
            up ? "bg-risk-safe/10 text-risk-safe" : "bg-risk-high/10 text-risk-high",
          )}
        >
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {trend}
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}