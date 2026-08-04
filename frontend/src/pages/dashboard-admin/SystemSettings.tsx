// pages/admin/SystemSettings.tsx
export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-muted-foreground">
          System settings options will be displayed here
        </p>
      </div>
    </div>
  );
}