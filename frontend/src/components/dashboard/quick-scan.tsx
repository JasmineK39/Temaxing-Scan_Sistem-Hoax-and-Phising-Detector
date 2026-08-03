import { useState } from "react";
import { ClipboardPaste, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { scanSuggestions } from "@/data/dashboard";

export function QuickScan() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!value.trim()) {
      toast("Nothing to analyze", { description: "Paste a link or article first." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Scan complete", { description: "Risk score 94 · credential phishing." });
    }, 1100);
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setValue(text);
    } catch {
      toast("Clipboard unavailable", { description: "Paste manually with ⌘V." });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-6 shadow-lift md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-brand-gradient opacity-[0.14] blur-3xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-ai px-3 py-1 text-xs font-medium text-ai-foreground">
          <Sparkles className="size-3.5" /> AI Quick Scan
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-[28px]">
          Check anything before you trust it
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Drop a suspicious link or a news headline. Temaxing AI returns a risk score, the signals
          behind it, and what to do next.
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-muted/50 p-2 md:flex-row md:items-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="Paste a URL or article text..."
            className="h-11 w-full flex-1 rounded-xl bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={paste}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition hover:shadow-soft"
            >
              <ClipboardPaste className="size-4" /> Paste
            </button>
            <button
              type="button"
              onClick={analyze}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-70"
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

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Recent suggestions</span>
          {scanSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className="max-w-full truncate rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition hover:border-secondary/40 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}