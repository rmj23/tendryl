import { Droplets } from "lucide-react";

const days = [
  { day: "Mon", usage: 65 },
  { day: "Tue", usage: 80 },
  { day: "Wed", usage: 45 },
  { day: "Thu", usage: 90 },
  { day: "Fri", usage: 70 },
  { day: "Sat", usage: 30 },
  { day: "Sun", usage: 20 },
];

export function WaterUsageWidget() {
  const max = Math.max(...days.map((d) => d.usage));

  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm h-full flex flex-col">
      <div className="px-3 py-3 border-b border-[hsl(0,0%,12%)]">
        <div className="flex items-center gap-1.5">
          <Droplets className="h-3 w-3 text-[#3b82f6]" />
          <h3 className="text-xs font-semibold font-display tracking-tight">Water</h3>
        </div>
        <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">This week</p>
      </div>
      <div className="flex-1 flex items-end gap-1 px-2 pb-2 pt-3">
        {days.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm bg-[#3b82f6]/60 transition-all min-h-[4px]"
              style={{ height: `${(d.usage / max) * 60}px` }}
            />
            <span className="text-[8px] text-[hsl(0,0%,35%)]">{d.day.charAt(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
