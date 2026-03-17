import { Cloud, Sun, Droplets, Wind } from "lucide-react";
import { useContainerSize } from "@/hooks/useContainerSize";

export function WeatherWidget() {
  const { ref, size } = useContainerSize();
  const compact = size.width < 200 || size.height < 160;
  const showDetails = size.height > 120 && size.width > 160;

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold font-display tracking-tight">Weather</h3>
        {!compact && <p className="text-[10px] text-muted-foreground mt-0.5">Current conditions</p>}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center min-h-0">
        <div className="flex items-center gap-3 mb-2">
          <Sun className={`${compact ? "h-6 w-6" : "h-10 w-10"} text-[hsl(38,92%,50%)]`} />
          <div>
            <p className={`${compact ? "text-xl" : "text-3xl"} font-display font-bold`}>74°F</p>
            <p className="text-xs text-muted-foreground">Partly Cloudy</p>
          </div>
        </div>
        {showDetails && (
          <div className={`grid gap-2 mt-2 ${size.width < 250 ? "grid-cols-2" : "grid-cols-3"}`}>
            {[
              { icon: Droplets, label: "Humidity", value: "62%" },
              { icon: Wind, label: "Wind", value: "8 mph" },
              { icon: Cloud, label: "Rain", value: "10%" },
            ].map((item) => (
              <div key={item.label} className="text-center p-2 rounded-lg bg-muted/40">
                <item.icon className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <p className="text-xs font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
