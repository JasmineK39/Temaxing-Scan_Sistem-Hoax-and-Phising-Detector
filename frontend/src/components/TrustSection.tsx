import { BrainCircuit, Radar, Globe, Lock, FileSearch } from "lucide-react";
import { Section } from "@/components/Section";

const SOURCES = [
  {
    icon: BrainCircuit,
    name: "AI Analysis",
    detail: "Language and pattern models read page content and intent.",
  },
  {
    icon: Radar,
    name: "VirusTotal",
    detail: "Cross-checks the address against 70+ antivirus engines.",
  },
  {
    icon: FileSearch,
    name: "Safe Browsing",
    detail: "Flags phishing and malware reported by Google.",
  },
  {
    icon: Globe,
    name: "WHOIS",
    detail: "Reveals domain age, registrar, and ownership signals.",
  },
  {
    icon: Lock,
    name: "SSL Verification",
    detail: "Validates the certificate, issuer, and encryption chain.",
  },
];

export function TrustSection() {
  return (
    <Section id="about" aria-labelledby="trust-heading" className="py-20 md:py-24">
      <div className="flex flex-col gap-10">
        <p
          id="trust-heading"
          className="text-center text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          Every scan combines multiple independent intelligence sources
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOURCES.map((source) => (
            <li key={source.name} className="card-soft flex flex-col gap-3 p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <source.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-[15px] font-semibold">{source.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{source.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
