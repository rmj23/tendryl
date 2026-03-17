import { Sprout, BarChart3, Truck, AlertTriangle } from "lucide-react";
import { useContainerSize } from "@/hooks/useContainerSize";

const stats = [
  { icon: Sprout, label: "Active Crops", value: "12,480", change: "+340 this week", positive: true },
  { icon: BarChart3, label: "Production Rate", value: "94.2%", change: "+2.1% vs last month", positive: true },
  { icon: Truck, label: "Orders Pending", value: "23", change: "6 ship today", positive: true },
  { icon: AlertTriangle, label: "Active Alerts", value: "3", change: "1 critical", positive: false },
];

export function ProductionStats() {
  const { ref, size } = useContainerSize();
  const cols = size.width < 300 ? 1 : size.width < 500 ? 2 : 4;

  return (
    <div ref={ref} className="h-full p-3">
      <div className="grid gap-3 h-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-[11px] text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-display font-bold tracking-tight">{stat.value}</p>
              <p className={`text-[10px] mt-1 ${stat.positive ? "text-[hsl(142,71%,45%)]" : "text-destructive"}`}>{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
