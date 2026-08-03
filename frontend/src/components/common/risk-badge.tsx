import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/data/dashboard";

const styles: Record<RiskLevel, string> = {
  safe: "bg-risk-safe/12 text-risk-safe ring-risk-safe/25",
  low: "bg-risk-low/16 text-risk-low ring-risk-low/30",
  medium: "bg-risk-medium/14 text-risk-medium ring-risk-medium/30",
  high: "bg-risk-high/12 text-risk-high ring-risk-high/25",
};

const labels: Record<RiskLevel, string> = {
  safe: "Safe",
  low: "Low",
  medium: "Suspicious",
  high: "Dangerous",
};

export function RiskBadge({
  risk,
  score,
  className,
}: {
  risk: RiskLevel;
  score?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset tabular-nums",
        styles[risk],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {typeof score === "number" ? `${score} · ${labels[risk]}` : labels[risk]}
    </span>
  );
}

export function riskFromScore(score: number): RiskLevel {
  if (score >= 80) return "high";
  if (score >= 55) return "medium";
  if (score >= 25) return "low";
  return "safe";
}