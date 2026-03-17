import { Droplets } from "lucide-react";
import { useContainerSize } from "@/hooks/useContainerSize";

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
  const { ref, size } = useContainerSize();
  const max = Math.max(...days.map((d) => d.usage));
  const compact = size.width < 120;
  const barMaxH = Math.max(20, size.height - 80);

  return (
    <div ref={ref} className="h-full flex flex-col transition-all duration-150">
      <div className="px-3 py-3 border-b border-border">
        <div className="flex items-center gap-1.5">
          <Droplets className="h-3 w-3 text-[hsl(217,91%,60%)]" />
          <h3 className="text-xs font-semibold font-display tracking-tight">Water</h3>
        </div>
        {!compact && <p className="text-[10px] text-muted-foreground mt-0.5">This week</p>}
      </div>
      <div className="flex-1 flex items-end gap-1 px-2 pb-2 pt-3">
        {days.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-sm bg-[hsl(217,91%,60%,0.4)] transition-all min-h-[4px]" style={{ height: `${(d.usage / max) * barMaxH}px` }} />
            {!compact && <span className="text-[8px] text-muted-foreground">{d.day.charAt(0)}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
