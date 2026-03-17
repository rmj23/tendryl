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

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: Phone, label: "Call Flows", path: "/call-flows" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
];

export default function HomePage() {
  const location = useLocation();

  return (
    <div className="h-screen flex bg-background" style={{ color: "hsl(var(--foreground))" }}>
      {/* Left Nav */}
      <aside className="w-[200px] flex-shrink-0 border-r border-border bg-card flex flex-col">
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 border-b border-border bg-card">
          <h1 className="font-display text-lg font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Welcome back. Here's an overview of your operation.</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Stats row */}
          <ProductionStats />

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Map - large */}
            <div className="col-span-8">
              <Widget><GreenhouseMap /></Widget>
            </div>
            {/* Right column */}
            <div className="col-span-4 space-y-4">
              <Widget><WeatherWidget /></Widget>
              <Widget><AlertsWidget /></Widget>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <Widget><TodaysTasks /></Widget>
            </div>
            <div className="col-span-3">
              <Widget><GrowingSchedule /></Widget>
            </div>
            <div className="col-span-3">
              <Widget><InventoryWidget /></Widget>
            </div>
            <div className="col-span-2">
              <Widget><WaterUsageWidget /></Widget>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden h-full">
      {children}
    </div>
  );
}
