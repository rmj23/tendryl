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
    <div className="h-screen flex" style={{ background: "#0F0F0F", color: "hsl(0,0%,90%)" }}>
      {/* Left Nav */}
      <aside className="w-[200px] flex-shrink-0 border-r border-[hsl(0,0%,12%)] flex flex-col">
        <div className="px-4 py-5 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-[#00B8A9]" />
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
                    ? "bg-[#00B8A9]/10 text-[#00B8A9]"
                    : "text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,8%)]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 pb-4 space-y-1">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,8%)] w-full transition-colors">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <p className="px-3 text-[10px] text-[hsl(0,0%,30%)]">Tendryl v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[hsl(0,0%,12%)]">
          <h1 className="font-display text-lg font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs text-[hsl(0,0%,45%)] mt-0.5">Welcome back. Here's your nursery overview.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Row 1: Stats */}
          <ProductionStats />

          {/* Row 2: Map + Weather + Alerts */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <GreenhouseMap />
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <WeatherWidget />
              <AlertsWidget />
            </div>
          </div>

          {/* Row 3: Tasks + Schedule + Inventory + Water */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <TodaysTasks />
            </div>
            <div className="col-span-3">
              <GrowingSchedule />
            </div>
            <div className="col-span-3">
              <InventoryWidget />
            </div>
            <div className="col-span-2">
              <WaterUsageWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
