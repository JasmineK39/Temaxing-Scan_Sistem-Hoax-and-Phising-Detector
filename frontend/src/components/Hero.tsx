import { ArrowRight, Sparkles, ShieldCheck, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-shield.png";

export function Hero() {
  return (
    <section id="home" className="gradient-hero relative overflow-hidden px-6 pt-36 pb-20 md:pt-44">
      <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-rise flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-[13px] font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            AI-powered digital trust platform
          </span>

          <h1 className="text-4xl leading-[1.05] font-bold text-balance md:text-6xl lg:text-[64px]">
            Know whether a website is <span className="text-gradient-brand">safe</span> before you
            click.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Temaxing Scan analyzes URLs, emails, and online news with artificial intelligence and
            trusted security intelligence sources — then explains the risk in plain language anyone
            can understand.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#cta">
    <Button variant="brand" size="xl">
        <Link2 className="mr-2 h-4 w-4" />
        Analyze URL
    </Button>
</a>
            <a href="#features">
    <Button variant="soft" size="xl">
        Learn More
    </Button>
</a>
          </div>

          <dl className="mt-2 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
            {[
              { value: "5+", label: "Intelligence sources" },
              { value: "~4s", label: "Average scan time" },
              { value: "100%", label: "Human-readable reports" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold tracking-tight">{stat.value}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise relative [animation-delay:120ms]">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-brand/15 blur-3xl"
          />
          <img
            src={heroIllustration}
            alt="Illustration of an AI security dashboard protected by a shield with a verification checkmark"
            width={1024}
            height={1024}
            className="relative w-full drop-shadow-2xl"
          />
          <div className="relative -mt-6 ml-auto flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-lift)]">
            <span className="flex size-9 items-center justify-center rounded-xl bg-success/12 text-success">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">Verdict: Safe</p>
              <p className="text-xs text-muted-foreground">SSL valid · No malware detected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
