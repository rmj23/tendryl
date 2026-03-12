import { Cloud, Sun, Droplets, Wind } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(220,15%,90%)]">
        <h3 className="text-sm font-semibold font-display tracking-tight text-[hsl(220,15%,15%)]">Weather</h3>
        <p className="text-[10px] text-[hsl(220,10%,55%)] mt-0.5">Current conditions</p>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <Sun className="h-10 w-10 text-[#f59e0b]" />
          <div>
            <p className="text-3xl font-display font-bold text-[hsl(220,15%,15%)]">74°F</p>
            <p className="text-xs text-[hsl(220,10%,55%)]">Partly Cloudy</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Droplets, label: "Humidity", value: "62%" },
            { icon: Wind, label: "Wind", value: "8 mph" },
            { icon: Cloud, label: "Rain", value: "10%" },
          ].map((item) => (
            <div key={item.label} className="text-center p-2 rounded-lg bg-[hsl(210,20%,97%)]">
              <item.icon className="h-3.5 w-3.5 mx-auto mb-1 text-[hsl(220,10%,55%)]" />
              <p className="text-[10px] text-[hsl(220,10%,55%)]">{item.label}</p>
              <p className="text-xs font-semibold text-[hsl(220,15%,20%)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
