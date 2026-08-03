import { LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/data/dashboard";

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-surface p-1 pr-1.5 shadow-soft outline-none transition hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring">
        <span className="grid size-8 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-primary-foreground">
          {currentUser.initials}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2">
        <div className="px-2 py-2">
          <p className="text-sm font-semibold">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-xl py-2"
          onSelect={() => toast("Profile", { description: "Profile page coming soon." })}
        >
          <User className="size-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-xl py-2"
          onSelect={() => toast("Settings", { description: "Settings page coming soon." })}
        >
          <Settings className="size-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-xl py-2 text-destructive focus:text-destructive"
          onSelect={() => toast("Signed out", { description: "You have been logged out." })}
        >
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}