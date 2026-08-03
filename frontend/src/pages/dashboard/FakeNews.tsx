import { useState } from "react";
import {
  ClipboardPaste,
  Loader2,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { SurfaceCard } from "@/components/common/surface-card";
import { fakeNewsResult } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const claimTone: Record<string, string> = {
  False: "bg-red-100 text-red-700",
  Unsupported: "bg-yellow-100 text-yellow-700",
  "Partly true": "bg-green-100 text-green-700",
};

export default function FakeNewsPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (text.trim().length < 20) {
      toast("Article too short", {
        description: "Paste at least a few sentences.",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Credibility analysis ready");
    }, 1200);
  };

  const paste = async () => {
    try {
      const clip = await navigator.clipboard.readText();

      if (clip) {
        setText(clip);
      }
    } catch {
      toast("Clipboard unavailable", {
        description: "Paste manually using Ctrl + V.",
      });
    }
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5">

        {/* LEFT PANEL */}

        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-6 shadow-lift md:p-8">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 size-64 rounded-full gradient-hero opacity-15 blur-3xl"
            />

            <div className="relative">

              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
                <Newspaper className="size-3.5" />
                Article Analysis
              </span>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-[28px]">
                Verify a news story
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Paste the full article or headline. Temaxing AI extracts the
                core claims and evaluates them using credibility,
                publication signals, writing patterns, and trusted references.
              </p>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                placeholder="Paste the article text here..."
                className="mt-6 w-full resize-none rounded-2xl border border-border bg-muted/50 p-4 text-sm leading-relaxed outline-none transition placeholder:text-muted-foreground focus:border-secondary/50 focus:bg-surface focus:ring-4 focus:ring-secondary/10"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">

                <button
                  type="button"
                  onClick={paste}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-medium transition hover:shadow-soft"
                >
                  <ClipboardPaste className="size-4" />
                  Paste Article
                </button>

                <button
                  type="button"
                  onClick={analyze}
                  disabled={loading}
                  className="
    inline-flex
    h-12
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-brand-gradient
    px-6
    text-sm
    font-semibold
    text-white
    shadow-glow
    transition
    hover:brightness-110
    disabled:opacity-70
  "
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}

                  Analyze
                </button>

                <span className="text-xs text-muted-foreground sm:ml-1">
                  {text.trim()
                    ? `${text.trim().split(/\s+/).length} words`
                    : "0 words"}
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-5 lg:col-span-2">

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold">
                AI Result
              </p>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {fakeNewsResult.verdict}
              </span>

            </div>

            <div className="mt-5 flex items-end gap-2">

              <span className="text-gradient-brand text-5xl font-semibold tracking-tight tabular-nums">
                {fakeNewsResult.credibility}
              </span>

              <span className="pb-2 text-sm text-muted-foreground">
                / 100 credibility
              </span>

            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">

              <div
                className="h-full rounded-full bg-secondary"
                style={{
                  width: `${fakeNewsResult.credibility}%`,
                }}
              />

            </div>

          </div>
                    <SurfaceCard className="p-6">
            <p className="text-sm font-semibold">
              Detected Claims
            </p>

            <ul className="mt-4 space-y-3">
              {fakeNewsResult.claims.map((claim) => (
                <li
                  key={claim.claim}
                  className="rounded-2xl border border-border p-4"
                >
                  <p className="text-sm leading-relaxed">
                    {claim.claim}
                  </p>

                  <span
                    className={cn(
                      "mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      claimTone[claim.status] ??
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {claim.status}
                  </span>
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <p className="text-sm font-semibold">
              AI Reasoning
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {fakeNewsResult.reasoning}
            </p>

            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Recommendation
              </p>

              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {fakeNewsResult.recommendation}
              </p>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </>
  );
}