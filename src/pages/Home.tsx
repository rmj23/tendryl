import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import { Home as HomeIcon, Phone, MessageSquare, LogOut, Sprout } from "lucide-react";
import { GreenhouseMap } from "@/components/dashboard/GreenhouseMap";
import { TodaysTasks } from "@/components/dashboard/TodaysTasks";
import { GrowingSchedule } from "@/components/dashboard/GrowingSchedule";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { AlertsWidget } from "@/components/dashboard/AlertsWidget";
import { InventoryWidget } from "@/components/dashboard/InventoryWidget";
import { ProductionStats } from "@/components/dashboard/ProductionStats";
import { WaterUsageWidget } from "@/components/dashboard/WaterUsageWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: Phone, label: "Call Flows", path: "/call-flows" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
];

const defaultLayouts: any = {
  lg: [
    { i: "stats", x: 0, y: 0, w: 12, h: 3, minW: 6, minH: 2 },
    { i: "map", x: 0, y: 3, w: 8, h: 8, minW: 4, minH: 5 },
    { i: "weather", x: 8, y: 3, w: 4, h: 4, minW: 3, minH: 3 },
    { i: "alerts", x: 8, y: 7, w: 4, h: 4, minW: 3, minH: 3 },
    { i: "tasks", x: 0, y: 11, w: 4, h: 7, minW: 3, minH: 4 },
    { i: "schedule", x: 4, y: 11, w: 3, h: 7, minW: 2, minH: 4 },
    { i: "inventory", x: 7, y: 11, w: 3, h: 7, minW: 2, minH: 4 },
    { i: "water", x: 10, y: 11, w: 2, h: 7, minW: 2, minH: 4 },
  ],
};

const widgetMap: Record<string, React.ReactNode> = {
  stats: <ProductionStats />,
  map: <GreenhouseMap />,
  weather: <WeatherWidget />,
  alerts: <AlertsWidget />,
  tasks: <TodaysTasks />,
  schedule: <GrowingSchedule />,
  inventory: <InventoryWidget />,
  water: <WaterUsageWidget />,
};

export default function HomePage() {
  const location = useLocation();
  const [layouts, setLayouts] = useState(defaultLayouts);

  const onLayoutChange = useCallback((_: any, allLayouts: any) => {
    setLayouts(allLayouts);
  }, []);

  return (
    <div className="h-screen flex bg-[hsl(210,20%,98%)]" style={{ color: "hsl(220,15%,20%)" }}>
      {/* Left Nav */}
      <aside className="w-[200px] flex-shrink-0 border-r border-[hsl(220,15%,90%)] bg-white flex flex-col">
        <div className="px-4 py-5 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-[#00B8A9]" />
          <span className="font-display font-bold text-base tracking-tight text-[hsl(220,15%,15%)]">Tendryl</span>
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
                    : "text-[hsl(220,10%,50%)] hover:text-[hsl(220,15%,25%)] hover:bg-[hsl(220,15%,96%)]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 pb-4 space-y-1">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(220,10%,50%)] hover:text-[hsl(220,15%,25%)] hover:bg-[hsl(220,15%,96%)] w-full transition-colors">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <p className="px-3 text-[10px] text-[hsl(220,10%,70%)]">Tendryl v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 border-b border-[hsl(220,15%,90%)] bg-white">
          <h1 className="font-display text-lg font-bold tracking-tight text-[hsl(220,15%,15%)]">Dashboard</h1>
          <p className="text-xs text-[hsl(220,10%,55%)] mt-0.5">Welcome back. Drag and resize widgets to customize your view.</p>
        </div>

        <div className="p-4">
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            onLayoutChange={onLayoutChange}
            draggableHandle=".widget-drag-handle"
            isResizable
            isDraggable
          >
            {Object.entries(widgetMap).map(([key, widget]) => (
              <div key={key} className="widget-wrapper">
                <div className="h-full rounded-xl border border-[hsl(220,15%,90%)] bg-white shadow-sm overflow-hidden flex flex-col">
                  <div className="widget-drag-handle cursor-grab active:cursor-grabbing h-2 bg-[hsl(220,15%,95%)] hover:bg-[hsl(220,15%,90%)] transition-colors flex items-center justify-center">
                    <div className="w-8 h-0.5 rounded-full bg-[hsl(220,10%,80%)]" />
                  </div>
                  <div className="flex-1 overflow-hidden">{widget}</div>
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </main>
    </div>
  );
}
