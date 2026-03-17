import { AlertTriangle, Thermometer, Droplets, Wifi } from "lucide-react";
import { useContainerSize } from "@/hooks/useContainerSize";

const alerts = [
  { id: "1", icon: Thermometer, message: "GH-B temp above 78°F", severity: "warning" as const, time: "12m ago" },
  { id: "2", icon: Droplets, message: "Propagation humidity at 88%", severity: "info" as const, time: "34m ago" },
  { id: "3", icon: Wifi, message: "Sensor Z10 offline", severity: "error" as const, time: "1h ago" },
];

const severityStyles = {
  warning: { bg: "hsl(38,92%,50%,0.08)", color: "hsl(38,92%,50%)" },
  info: { bg: "hsl(217,91%,60%,0.08)", color: "hsl(217,91%,60%)" },
  error: { bg: "hsl(0,84%,60%,0.08)", color: "hsl(0,84%,60%)" },
};

export function AlertsWidget() {
  const { ref, size } = useContainerSize();
  const compact = size.width < 200;

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-[hsl(38,92%,50%)]" />
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight">Alerts</h3>
          {!compact && <p className="text-[10px] text-muted-foreground mt-0.5">{alerts.length} active</p>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const style = severityStyles[alert.severity];
          return (
            <div key={alert.id} className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors">
              <div className="mt-0.5 p-1 rounded" style={{ background: style.bg }}>
                <Icon className="h-3 w-3" style={{ color: style.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate">{alert.message}</p>
                {!compact && <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
