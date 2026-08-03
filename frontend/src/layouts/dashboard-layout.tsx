import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopNavbar } from "@/components/navbar/top-navbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-border bg-sidebar lg:block">
        <AppSidebar />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 left-0 w-[280px] border-r border-border bg-sidebar shadow-lift">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-6 grid size-8 place-items-center rounded-full border border-border bg-surface text-muted-foreground"
            >
              <X className="size-4" />
            </button>

            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="lg:pl-[260px]">
        <TopNavbar onOpenSidebar={() => setMobileOpen(true)} />

        <main className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}