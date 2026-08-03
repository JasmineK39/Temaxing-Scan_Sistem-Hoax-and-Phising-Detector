import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { aiInsight } from "@/data/dashboard";

export function AiInsightCard() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-ai shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
            <Sparkles className="size-[18px] text-primary-foreground" />
          </span>
          <div>
            <p className="text-sm font-semibold">AI Security Insight</p>
            <p className="text-xs text-muted-foreground">Generated from your last 30 days</p>
          </div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ai-foreground">
          Temaxing AI v1.4
        </span>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5 shadow-soft lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI summary
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{aiInsight.summary}</p>
          <div className="mt-4 rounded-xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Recommendation
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{aiInsight.recommendation}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-accent" />
            <p className="text-sm font-semibold">Recent phishing trends</p>
          </div>
          <ul className="mt-3 space-y-2.5">
            {aiInsight.trends.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-surface p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4 text-secondary" />
            <p className="text-sm font-semibold">Safe browsing tips</p>
          </div>
          <ul className="mt-3 space-y-2.5">
            {aiInsight.tips.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}