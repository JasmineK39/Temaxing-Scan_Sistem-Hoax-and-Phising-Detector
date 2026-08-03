import { Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import { NotificationsMenu } from "./notifications-menu";
import { ProfileMenu } from "@/components/profile/profile-menu";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/phishing": "Phishing Analysis",
  "/dashboard/fake-news": "Fake News Detection",
  "/dashboard/history": "Scan History",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

interface TopNavbarProps {
  onOpenSidebar: () => void;
}

export function TopNavbar({ onOpenSidebar }: TopNavbarProps) {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 md:px-8">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground lg:hidden"
        >
          <Menu className="size-[18px]" />
        </button>

        {/* Page Title */}
        <h1 className="shrink-0 text-base font-semibold tracking-tight md:text-lg">
          {title}
        </h1>

        {/* Search */}
        <div className="mx-auto hidden w-full max-w-md md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search previous scans..."
              className="h-10 w-full rounded-full border border-border bg-muted/60 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-secondary/50 focus:bg-surface focus:ring-4 focus:ring-secondary/10"
            />
          </div>
        </div>

        {/* Right Menu */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}