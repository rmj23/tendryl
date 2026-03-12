import { AlertTriangle, Thermometer, Droplets, Wifi } from "lucide-react";

const alerts = [
  { id: "1", icon: Thermometer, message: "GH-A Zone 2 temp above 78°F", severity: "warning" as const, time: "12m ago" },
  { id: "2", icon: Droplets, message: "Propagation humidity at 88%", severity: "info" as const, time: "34m ago" },
  { id: "3", icon: Wifi, message: "Sensor Z10 offline", severity: "error" as const, time: "1h ago" },
];

const severityStyles = {
  warning: "text-[#f59e0b] bg-[#f59e0b]/10",
  info: "text-[#3b82f6] bg-[#3b82f6]/10",
  error: "text-[#ef4444] bg-[#ef4444]/10",
};

export function AlertsWidget() {
  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm flex-1">
      <div className="px-4 py-3 border-b border-[hsl(0,0%,12%)] flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-[#f59e0b]" />
        <h3 className="text-sm font-semibold font-display tracking-tight">Alerts</h3>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b]">{alerts.length}</span>
      </div>
      <div className="p-2 space-y-1">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-[hsl(0,0%,8%)] transition-colors">
              <div className={`p-1 rounded ${severityStyles[alert.severity]}`}>
                <Icon className="h-3 w-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] leading-tight">{alert.message}</p>
                <p className="text-[9px] text-[hsl(0,0%,35%)] mt-0.5">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
