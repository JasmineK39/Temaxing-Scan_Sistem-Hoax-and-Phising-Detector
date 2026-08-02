import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";

export function CTA() {
  return (
    <Section id="cta" aria-labelledby="cta-heading" className="pb-8">
      <div className="gradient-hero relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-border bg-surface px-8 py-16 text-center shadow-[var(--shadow-lift)] md:px-16 md:py-20">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-[var(--shadow-glow)]">
          <ShieldCheck className="size-7" aria-hidden="true" />
        </span>
        <h2
          id="cta-heading"
          className="mx-auto mt-7 max-w-2xl text-3xl font-bold text-balance md:text-[40px] md:leading-[1.1]"
        >
          Ready to check suspicious websites?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Run your first scan in seconds. No installation, no security background required.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#home">
  <Button variant="brand" size="xl">
    Start Scanning
    <ArrowRight aria-hidden="true" />
  </Button>
</a>

<a href="#how-it-works">
  <Button variant="soft" size="xl">
    See how it works
  </Button>
</a>
        </div>
      </div>
    </Section>
  );
}
