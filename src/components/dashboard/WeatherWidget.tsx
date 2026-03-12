import { Sun, CloudRain, Wind, Droplets } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm">
      <div className="px-4 py-3 border-b border-[hsl(0,0%,12%)]">
        <h3 className="text-sm font-semibold font-display tracking-tight">Weather</h3>
        <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">Portland, OR</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Sun className="h-8 w-8 text-[#f59e0b]" />
          <div>
            <p className="text-2xl font-display font-bold tracking-tight">68°F</p>
            <p className="text-[10px] text-[hsl(0,0%,45%)]">Partly cloudy</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Wind, label: "Wind", value: "8 mph" },
            { icon: Droplets, label: "Humidity", value: "54%" },
            { icon: CloudRain, label: "Rain", value: "10%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center p-2 rounded-lg bg-[hsl(0,0%,8%)]">
              <Icon className="h-3 w-3 mx-auto text-[hsl(0,0%,45%)] mb-1" />
              <p className="text-[10px] text-[hsl(0,0%,40%)]">{label}</p>
              <p className="text-xs font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
