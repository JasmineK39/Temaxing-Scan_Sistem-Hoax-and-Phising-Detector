import { Target, Zap, Languages } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";

const PILLARS = [
  {
    icon: Target,
    title: "Accurate",
    description:
      "A verdict is never based on a single signal. We weigh AI analysis against independent threat databases, certificate data, and domain history to reduce false alarms.",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "Parallel checks return a complete report in about four seconds — quick enough to run before you open a link, not after something goes wrong.",
  },
  {
    icon: Languages,
    title: "Easy to Understand",
    description:
      "Every finding is written for people, not analysts. Students, parents, and small business owners get the same clarity as a security team.",
  },
];

export function WhyChoose() {
  return (
    <Section aria-labelledby="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why Temaxing Scan"
        title="Credible security judgment, made approachable"
      />
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <li key={pillar.title} className="card-soft flex flex-col gap-5 p-9">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <pillar.icon className="size-7" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-bold">{pillar.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
