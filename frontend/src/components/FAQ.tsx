import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "@/components/Section";

const FAQS = [
  {
    q: "Is Temaxing Scan free to use?",
    a: "Yes. Scanning a website, email address, or news article is free for individuals, students, and parents. Teams that need shared history and higher scan volume can upgrade later.",
  },
  {
    q: "Do I need technical knowledge to read the report?",
    a: "No. Every report starts with a plain-language verdict and a recommendation. Technical details such as certificate issuer or WHOIS records are there if you want them, but they are never required.",
  },
  {
    q: "Which sources do you use to decide if a site is safe?",
    a: "We combine AI content analysis with VirusTotal, Google Safe Browsing, WHOIS registration data, and SSL certificate verification. A verdict only becomes 'Safe' when multiple independent sources agree.",
  },
  {
    q: "Can Temaxing Scan really detect fake news?",
    a: "It detects strong indicators: unreliable publishers, manipulated or recycled claims, missing sources, and emotionally engineered framing. We report confidence honestly instead of pretending to be an absolute arbiter of truth.",
  },
  {
    q: "Do you store the links I scan?",
    a: "Scans are saved to your own history so you can review them later. You can delete any entry at any time, and we never sell scan data or personal information.",
  },
  {
    q: "What should I do if a site is flagged as dangerous?",
    a: "Close the page without entering any data. If you already submitted credentials, change that password immediately, enable two-factor authentication, and follow the recovery steps included in your report.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" aria-labelledby="faq-heading" className="bg-surface">
      <SectionHeading
        id="faq-heading"
        eyebrow="FAQ"
        title="Questions people ask before their first scan"
      />
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQS.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`item-${index}`}
              className="rounded-2xl border border-border bg-background px-6 shadow-[var(--shadow-soft)]"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
