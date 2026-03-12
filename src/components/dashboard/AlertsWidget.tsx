import { AlertTriangle, Thermometer, Droplets, Wifi } from "lucide-react";

const alerts = [
  { id: "1", icon: Thermometer, message: "GH-B temp above 78°F", severity: "warning" as const, time: "12m ago" },
  { id: "2", icon: Droplets, message: "Propagation humidity at 88%", severity: "info" as const, time: "34m ago" },
  { id: "3", icon: Wifi, message: "Sensor Z10 offline", severity: "error" as const, time: "1h ago" },
];

const severityStyles = {
  warning: { bg: "#f59e0b15", color: "#f59e0b" },
  info: { bg: "#3b82f615", color: "#3b82f6" },
  error: { bg: "#ef444415", color: "#ef4444" },
};

export function AlertsWidget() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(220,15%,90%)] flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-[#f59e0b]" />
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight text-[hsl(220,15%,15%)]">Alerts</h3>
          <p className="text-[10px] text-[hsl(220,10%,55%)] mt-0.5">{alerts.length} active</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const style = severityStyles[alert.severity];
          return (
            <div key={alert.id} className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[hsl(210,20%,96%)] transition-colors">
              <div className="mt-0.5 p-1 rounded" style={{ background: style.bg }}>
                <Icon className="h-3 w-3" style={{ color: style.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[hsl(220,15%,20%)]">{alert.message}</p>
                <p className="text-[10px] text-[hsl(220,10%,60%)] mt-0.5">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
