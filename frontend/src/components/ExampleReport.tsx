import { CheckCircle2, Lock, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";

const REASONS = [
  { icon: Lock, label: "SSL certificate valid", detail: "Issued by Let's Encrypt · expires in 74 days" },
  { icon: Globe, label: "Domain reputation good", detail: "Registered 6 years ago · no abuse reports" },
  { icon: ShieldCheck, label: "No malware detected", detail: "Clean across 72 antivirus engines" },
];

export function ExampleReport() {
  return (
    <Section aria-labelledby="report-heading" className="bg-surface">
      <SectionHeading
        id="report-heading"
        eyebrow="Example report"
        title="A report you can actually read"
        description="Here is what Temaxing Scan returns after analyzing a real domain."
      />

      <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[var(--radius)] border border-border bg-background shadow-[var(--shadow-lift)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-7 py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">https://kominfo-layanan.example.id</p>
              <p className="text-xs text-muted-foreground">Scanned just now · 3.8 seconds</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3.5 py-1.5 text-sm font-semibold text-success">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Safe
          </span>
        </div>

        <div className="grid gap-8 p-7 md:grid-cols-[240px_1fr] md:p-9">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-6">
            <div
              className="relative flex size-36 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(var(--success) 0turn 0.82turn, color-mix(in oklab, var(--border) 70%, transparent) 0.82turn 1turn)",
              }}
              role="img"
              aria-label="Risk score 82 out of 100"
            >
              <span className="flex size-28 flex-col items-center justify-center rounded-full bg-surface">
                <span className="text-3xl font-bold tracking-tight">82</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </span>
            </div>
            <p className="text-sm font-semibold">Risk Score</p>
            <p className="text-center text-xs text-muted-foreground">
              Higher score means stronger trust signals
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Reasons
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {REASONS.map((reason) => (
                  <li
                    key={reason.label}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/12 text-success">
                      <reason.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{reason.label}</p>
                      <p className="text-xs text-muted-foreground">{reason.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand/25 bg-brand/6 p-5">
              <h3 className="text-sm font-semibold tracking-wide text-brand uppercase">
                Recommendation
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                Safe to continue. The certificate and domain history look legitimate — still avoid
                entering passwords or payment data unless you initiated the visit yourself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
