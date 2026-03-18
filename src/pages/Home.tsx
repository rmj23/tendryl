import { useIsMobile } from "@/hooks/use-mobile";
import { GreenhouseMap } from "@/components/dashboard/GreenhouseMap";
import { TodaysTasks } from "@/components/dashboard/TodaysTasks";
import { GrowingSchedule } from "@/components/dashboard/GrowingSchedule";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { AlertsWidget } from "@/components/dashboard/AlertsWidget";
import { InventoryWidget } from "@/components/dashboard/InventoryWidget";
import { ProductionStats } from "@/components/dashboard/ProductionStats";
import { WaterUsageWidget } from "@/components/dashboard/WaterUsageWidget";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import AppLayout from "@/components/layout/AppLayout";

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
  const isMobile = useIsMobile();

  return (
    <AppLayout title="Dashboard" subtitle="Welcome back. Here's an overview of your operation.">
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </AppLayout>
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
