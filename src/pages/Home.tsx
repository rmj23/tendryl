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
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: Phone, label: "Call Flows", path: "/call-flows" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
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

/** Desktop: resizable panels */
function DesktopLayout() {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="p-4 flex-shrink-0">
        <ProductionStats />
      </div>
      <div className="flex-1 min-h-0 px-4 pb-4">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Top row: Map + Weather/Alerts */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={65} minSize={30}>
                <Widget><GreenhouseMap /></Widget>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35} minSize={20}>
                <div className="h-full flex flex-col gap-4">
                  <div className="flex-1 min-h-0">
                    <Widget><WeatherWidget /></Widget>
                  </div>
                  <div className="flex-1 min-h-0">
                    <Widget><AlertsWidget /></Widget>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Bottom row: Tasks + Schedule + Inventory + Water */}
          <ResizablePanel defaultSize={45} minSize={25}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={35} minSize={15}>
                <Widget><TodaysTasks /></Widget>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={12}>
                <Widget><GrowingSchedule /></Widget>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={12}>
                <Widget><InventoryWidget /></Widget>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={15} minSize={10}>
                <Widget><WaterUsageWidget /></Widget>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

/** Mobile/Tablet: stacked grid, no resizing */
function MobileLayout() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <ProductionStats />
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
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden h-full">
      {children}
    </div>
  );
}
