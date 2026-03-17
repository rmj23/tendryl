import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Phone, MessageSquare, LogOut, Sprout } from "lucide-react";
import { GreenhouseMap } from "@/components/dashboard/GreenhouseMap";
import { TodaysTasks } from "@/components/dashboard/TodaysTasks";
import { GrowingSchedule } from "@/components/dashboard/GrowingSchedule";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { AlertsWidget } from "@/components/dashboard/AlertsWidget";
import { InventoryWidget } from "@/components/dashboard/InventoryWidget";
import { ProductionStats } from "@/components/dashboard/ProductionStats";
import { WaterUsageWidget } from "@/components/dashboard/WaterUsageWidget";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: Phone, label: "Call Flows", path: "/call-flows" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
];

const defaultWidgets = [
  { id: "stats", component: <ProductionStats />, col: 1, row: 1, colSpan: 12, rowSpan: 1, minW: 4, minH: 1 },
  { id: "map", component: <GreenhouseMap />, col: 1, row: 2, colSpan: 8, rowSpan: 4, minW: 4, minH: 2 },
  { id: "weather", component: <WeatherWidget />, col: 9, row: 2, colSpan: 4, rowSpan: 2, minW: 2, minH: 2 },
  { id: "alerts", component: <AlertsWidget />, col: 9, row: 4, colSpan: 4, rowSpan: 2, minW: 2, minH: 2 },
  { id: "tasks", component: <TodaysTasks />, col: 1, row: 6, colSpan: 4, rowSpan: 3, minW: 2, minH: 2 },
  { id: "schedule", component: <GrowingSchedule />, col: 5, row: 6, colSpan: 3, rowSpan: 3, minW: 2, minH: 2 },
  { id: "inventory", component: <InventoryWidget />, col: 8, row: 6, colSpan: 3, rowSpan: 3, minW: 2, minH: 2 },
  { id: "water", component: <WaterUsageWidget />, col: 11, row: 6, colSpan: 2, rowSpan: 3, minW: 2, minH: 2 },
];

export default function HomePage() {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[200px] flex-shrink-0 border-r border-border bg-card flex-col">
        <div className="px-4 py-5 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-base tracking-tight">Tendryl</span>
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
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 pb-4 space-y-1">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-colors">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <p className="px-3 text-[10px] text-muted-foreground/60">Tendryl v1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 pb-16 md:pb-0">
        {/* Mobile header */}
        <div className="md:hidden px-4 py-3 border-b border-border bg-card flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-base tracking-tight">Tendryl</span>
        </div>

        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-border bg-card">
          <h1 className="font-display text-lg font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Welcome back. Here's an overview of your operation.</p>
        </div>

        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card flex items-center justify-around py-2 z-50">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] text-muted-foreground">
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </nav>
    </div>
  );
}

function DesktopLayout() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <DashboardGrid widgets={defaultWidgets} cols={12} rowHeight={80} maxRows={12} />
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Widget><ProductionStats /></Widget>
      <Widget><GreenhouseMap /></Widget>
      <Widget><WeatherWidget /></Widget>
      <Widget><AlertsWidget /></Widget>
      <Widget><TodaysTasks /></Widget>
      <Widget><GrowingSchedule /></Widget>
      <Widget><InventoryWidget /></Widget>
      <Widget><WaterUsageWidget /></Widget>
    </div>
  );
}

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {children}
    </div>
  );
}
