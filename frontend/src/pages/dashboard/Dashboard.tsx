import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { QuickScan } from "@/components/dashboard/quick-scan";
import { AiInsightCard } from "@/components/dashboard/ai-insight-card";
import { StatCard } from "@/components/cards/stat-card";
import { ScanTable } from "@/components/history/scan-table";
import { SectionHeading } from "@/components/common/section-heading";

import {
  currentUser,
  recentActivity,
  stats,
} from "@/data/dashboard";

const icons = {
  total: ScanLine,
  safe: ShieldCheck,
  suspicious: TriangleAlert,
  threats: ShieldAlert,
} as const;

const tones = {
  total: "primary",
  safe: "safe",
  suspicious: "medium",
  threats: "high",
} as const;

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back,
        </p>

        <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
          {currentUser.name}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Stay protected. Scan suspicious content before you trust it.
        </p>
      </div>

      <QuickScan />

      <section>
        <SectionHeading
          title="Statistics"
          description="Last 30 days across all scan types."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={s.value}
              trend={s.trend}
              up={s.up}
              icon={icons[s.key]}
              tone={tones[s.key]}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Recent Activity"
          description="Your latest analyses."
          action={
            <Link
              to="/dashboard/history"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm"
            >
              View All
              <ArrowUpRight className="size-4" />
            </Link>
          }
        />

        <ScanTable rows={recentActivity} />
      </section>

      <AiInsightCard />
    </div>
  );
}