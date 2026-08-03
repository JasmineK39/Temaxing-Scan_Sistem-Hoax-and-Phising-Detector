import { ArrowUpRight, Newspaper, ShieldCheck } from "lucide-react";
import { RiskBadge } from "@/components/common/risk-badge";
import type { ScanRecord } from "@/data/dashboard";

export function ScanTable({
  rows,
  targetLabel = "Target",
}: {
  rows: ScanRecord[];
  targetLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              {["Type", targetLabel, "Risk Score", "Result", "Date", ""].map((h, i) => (
                <th
                  key={i}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                  No scans match your filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40"
                >
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {row.type === "Phishing" ? (
                        <ShieldCheck className="size-3.5 text-primary" />
                      ) : (
                        <Newspaper className="size-3.5 text-accent" />
                      )}
                      {row.type}
                    </span>
                  </td>
                  <td className="max-w-[280px] px-5 py-4">
                    <p className="truncate font-medium text-foreground">{row.target}</p>
                    <p className="text-xs text-muted-foreground">{row.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <RiskBadge risk={row.risk} score={row.score} />
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{row.result}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{row.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition hover:border-secondary/40 hover:text-primary"
                    >
                      View <ArrowUpRight className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}