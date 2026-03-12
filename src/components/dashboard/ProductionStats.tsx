import { Sprout, BarChart3, Truck, AlertTriangle } from "lucide-react";

const stats = [
  { icon: Sprout, label: "Active Crops", value: "12,480", change: "+340 this week", positive: true },
  { icon: BarChart3, label: "Production Rate", value: "94.2%", change: "+2.1% vs last month", positive: true },
  { icon: Truck, label: "Orders Pending", value: "23", change: "6 ship today", positive: true },
  { icon: AlertTriangle, label: "Active Alerts", value: "3", change: "1 critical", positive: false },
];

export function ProductionStats() {
  return (
    <div className="grid grid-cols-4 gap-3 h-full p-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-lg border border-[hsl(220,15%,90%)] bg-[hsl(210,20%,98%)] p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-[#00B8A9]/10">
                <Icon className="h-3.5 w-3.5 text-[#00B8A9]" />
              </div>
              <span className="text-[11px] text-[hsl(220,10%,55%)]">{stat.label}</span>
            </div>
            <p className="text-xl font-display font-bold tracking-tight text-[hsl(220,15%,15%)]">{stat.value}</p>
            <p className={`text-[10px] mt-1 ${stat.positive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}
