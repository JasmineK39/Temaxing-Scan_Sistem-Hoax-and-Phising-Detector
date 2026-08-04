import { useEffect, useState } from "react";
import { ShieldCheck, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/ThemeWrapper";
import { useNavigate, useLocation } from "react-router-dom"; // ← Tambahkan useLocation
import "@/App.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 2. Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-[var(--shadow-glow)]">
            <ShieldCheck className="size-5" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">
            Temaxing Scan
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {!isAuthPage && (
          <div className="hidden items-center gap-2 sm:flex">
            
          <Button 
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else if (localStorage.getItem('role') === 'admin') {
                navigate('/dashboard');
              } else {
                navigate('/app');
              }
            }}
            variant="brand" 
            size="lg"
          >
            Analyze Now
          </Button>

            {/* Tombol Logout (Hanya muncul jika SUDAH login) */}
            {isLoggedIn && (
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="lg"
              >
                Logout
              </Button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-muted transition-colors"
            >
              {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </button>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            
            {!isAuthPage && (
              <li className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button 
                  onClick={() => {
                    setOpen(false);
                    navigate(isLoggedIn ? "/dashboard" : "/login");
                  }}
                  variant="brand" 
                  size="lg"
                  className="w-full"
                >
                  Analyze Now
                </Button>

                {isLoggedIn && (
                  <Button 
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    variant="outline" 
                    size="lg"
                    className="w-full"
                  >
                    Logout
                  </Button>
                )}
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;