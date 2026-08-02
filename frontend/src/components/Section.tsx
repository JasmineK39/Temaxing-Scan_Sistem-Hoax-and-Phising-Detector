import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}

export function Section({ id, className, children, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn("px-6 py-24 md:py-28", className)} {...rest}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <span className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand uppercase">
        {eyebrow}
      </span>
      <h2 id={id} className="text-3xl font-bold text-balance md:text-[40px] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
