// pages/admin/AdminDashboard.tsx
import { Users, FileText, Shield, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { label: "Reports Analyzed", value: "5,678", icon: FileText, change: "+8%" },
    { label: "Threats Detected", value: "42", icon: Shield, change: "-5%" },
    { label: "Active Sessions", value: "89", icon: TrendingUp, change: "+3%" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Overview of system statistics and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="size-8 text-brand" />
              <span className="text-xs font-medium text-success">
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-foreground">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <p className="text-muted-foreground">
          Activity feed akan ditampilkan di sini...
        </p>
      </div>
    </div>
  );
}