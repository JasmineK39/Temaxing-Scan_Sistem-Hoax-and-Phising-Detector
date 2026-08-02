import { ScanSearch, Newspaper, MessageSquareQuote, Gauge, History, ListChecks } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Website Scanner",
    description:
      "Paste any URL and get a full safety assessment covering certificates, domain reputation, redirects, and malware signals.",
  },
  {
    icon: Newspaper,
    title: "Fake News Detection",
    description:
      "Check online articles for manipulated claims, unreliable publishers, and misleading framing before you share them.",
  },
  {
    icon: MessageSquareQuote,
    title: "AI Explanation",
    description:
      "No jargon. Every result is explained in everyday language so students, parents, and teams know exactly what happened.",
  },
  {
    icon: Gauge,
    title: "Risk Score",
    description:
      "A single 0–100 score weighted across all intelligence sources, so you can make a decision in seconds.",
  },
  {
    icon: History,
    title: "Scan History",
    description:
      "Keep a searchable record of everything you and your team have checked, with verdicts saved for later review.",
  },
  {
    icon: ListChecks,
    title: "Security Recommendation",
    description:
      "Clear next steps: continue safely, verify further, or stop — plus how to protect your data if you already clicked.",
  },
];

export function FeatureSection() {
  return (
    <Section id="features" aria-labelledby="features-heading" className="bg-surface">
      <SectionHeading
        id="features-heading"
        eyebrow="Features"
        title="Everything you need to judge what's safe online"
        description="Built for people who are not security experts, and detailed enough for those who are."
      />
      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="card-soft flex flex-col gap-4 p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <feature.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="text-[22px] leading-snug font-semibold">{feature.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
