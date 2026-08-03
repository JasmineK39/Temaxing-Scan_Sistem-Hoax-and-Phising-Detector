import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/data/dashboard";
import { cn } from "@/lib/utils";

export function NotificationsMenu() {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative grid size-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground shadow-soft outline-none transition hover:text-foreground hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring">
        <Bell className="size-[18px]" />
        {unread > 0 ? (
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent ring-2 ring-surface" />
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2">
        <div className="flex items-center justify-between px-2 py-1.5">
          <p className="text-sm font-semibold">Notifications</p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {unread} new
          </span>
        </div>
        <div className="mt-1 space-y-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "rounded-xl px-3 py-2.5 transition-colors hover:bg-muted",
                n.unread && "bg-ai",
              )}
            >
              <p className="text-sm font-medium leading-snug">{n.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}