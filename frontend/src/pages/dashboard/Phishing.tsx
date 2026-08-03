import { useState } from "react";
import { ClipboardPaste, Globe, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/common/section-heading";
import { RiskBadge } from "@/components/common/risk-badge";
import { SurfaceCard } from "@/components/common/surface-card";
import { phishingBreakdown, recentActivity } from "@/data/dashboard";

export default PhishingPage;

function PhishingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const phishingScans = recentActivity.filter((r) => r.type === "Phishing");

  const analyze = () => {
    if (!url.trim()) {
      toast("Enter a URL", { description: "Paste the link you want to check." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Analysis ready", { description: "See the risk breakdown below." });
    }, 1100);
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch {
      toast("Clipboard unavailable", { description: "Paste manually with ⌘V." });
    }
  };

  return (
    <>
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-6 shadow-lift md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-24 size-64 rounded-full bg-brand-gradient opacity-[0.13] blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-ai px-3 py-1 text-xs font-medium text-ai-foreground">
              <ShieldCheck className="size-3.5" /> Website Scanner
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-[28px]">
              Analyze a suspicious website
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Temaxing AI inspects domain history, page structure, form behaviour and reputation
              feeds to explain the risk in plain language.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyze()}
                  placeholder="https://example.com/login"
                  className="h-14 w-full rounded-2xl border border-border bg-muted/50 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-secondary/50 focus:bg-surface focus:ring-4 focus:ring-secondary/10"
                />
              </div>
              <button
                type="button"
                onClick={paste}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-5 text-sm font-medium transition hover:shadow-soft"
              >
                <ClipboardPaste className="size-4" /> Paste
              </button>
              <button
                type="button"
                onClick={analyze}
                disabled={loading}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-7 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                Analyze
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-5">
          <SurfaceCard className="p-6 lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Risk explanation
                </p>
                <p className="mt-1 truncate text-base font-semibold">{phishingBreakdown.target}</p>
              </div>
              <RiskBadge risk={phishingBreakdown.risk} score={phishingBreakdown.score} />
            </div>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-risk-high"
                style={{ width: `${phishingBreakdown.score}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Verdict: <span className="font-medium text-foreground">{phishingBreakdown.verdict}</span>
            </p>

            <ul className="mt-5 divide-y divide-border">
              {phishingBreakdown.signals.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {s.weight}
                  </span>
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-3xl border border-border bg-ai p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <p className="text-sm font-semibold">Security recommendation</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Do not enter credentials on this page. If you already did, reset your password and
                revoke active sessions from the provider's official site, then enable an
                authenticator app instead of SMS codes.
              </p>
              <button
                type="button"
                onClick={() => toast.success("Domain reported to Temaxing threat feed")}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                Report this domain
              </button>
            </div>

            <SurfaceCard className="p-6">
              <p className="text-sm font-semibold">Recent scans</p>
              <ul className="mt-4 space-y-3">
                {phishingScans.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{s.target}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                    <RiskBadge risk={s.risk} score={s.score} />
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </div>
        </section>

        <section>
          <SectionHeading
            title="How scoring works"
            description="Every score combines five weighted signal groups."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["0 – 24", "Safe", "No malicious indicators found."],
              ["25 – 54", "Low", "Minor anomalies worth noting."],
              ["55 – 79", "Suspicious", "Multiple risky patterns detected."],
              ["80 – 100", "Dangerous", "Strong evidence of an attack."],
            ].map(([range, label, desc]) => (
              <SurfaceCard key={label} className="p-5">
                <p className="text-sm font-semibold tabular-nums">{range}</p>
                <p className="mt-1 text-sm font-medium text-primary">{label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </SurfaceCard>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}