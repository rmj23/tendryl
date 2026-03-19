import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Phone, MessageSquare, LogOut, Sprout, CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: CalendarDays, label: "Production", path: "/production-scheduling" },
  { icon: Phone, label: "Call Flows", path: "/call-flows" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
];

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export default function AppLayout({ title, subtitle, headerRight, children }: AppLayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[200px] flex-shrink-0 border-r border-primary/25 bg-primary text-primary-foreground flex-col">
        <div className="px-4 py-5 flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          <span className="font-display font-bold text-base tracking-tight text-primary-foreground">Tendryl</span>
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "text-primary-foreground/75 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 pb-4 space-y-1">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-primary-foreground/75 hover:text-primary-foreground hover:bg-primary-foreground/10 w-full transition-colors">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <p className="px-3 text-[10px] text-primary-foreground/50">Tendryl v1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 pb-16 md:pb-0">
        {/* Mobile header */}
        <div className="md:hidden px-4 py-3 border-b border-primary/25 bg-primary text-primary-foreground flex items-center gap-2">
          <Sprout className="h-5 w-5" />
          <span className="font-display font-bold text-base tracking-tight text-primary-foreground">Tendryl</span>
        </div>

        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-border bg-card flex flex-wrap items-center gap-2 md:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold tracking-tight truncate">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
          </div>
          <div className="shrink-0">{headerRight}</div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-primary/25 bg-primary text-primary-foreground flex items-center justify-around py-2 z-50">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] transition-colors ${
                active ? "text-primary-foreground" : "text-primary-foreground/70"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] text-primary-foreground/70">
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </nav>
    </div>
  );
}
