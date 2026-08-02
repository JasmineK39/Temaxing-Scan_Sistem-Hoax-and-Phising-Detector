import { ClipboardPaste, Cpu, FileBarChart2, ShieldCheck, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";

const STEPS = [
  {
    icon: ClipboardPaste,
    title: "Paste URL",
    description: "Drop in a link, an email address, or a news article you are unsure about.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our models and security feeds inspect the target in parallel within seconds.",
  },
  {
    icon: FileBarChart2,
    title: "Security Report",
    description: "You receive a risk score with the exact reasons behind every finding.",
  },
  {
    icon: ShieldCheck,
    title: "Recommendation",
    description: "Get a plain-language verdict and the safest action to take next.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-heading">
      <SectionHeading
        id="how-heading"
        eyebrow="How it works"
        title="From suspicious link to clear answer in four steps"
      />
      <ol className="mt-14 grid gap-6 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative">
            <div className="card-soft flex h-full flex-col gap-4 p-7">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-[var(--shadow-glow)]">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-[22px] font-semibold">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute top-1/2 -right-5 hidden size-5 -translate-y-1/2 text-brand/50 lg:block"
              />
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
