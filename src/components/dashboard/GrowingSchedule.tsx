import { useContainerSize } from "@/hooks/useContainerSize";

const crops = [
  { name: "Petunias", stage: "Flowering", progress: 85, color: "hsl(271,81%,56%)" },
  { name: "Tomatoes", stage: "Fruiting", progress: 70, color: "hsl(0,84%,60%)" },
  { name: "Herbs Mix", stage: "Vegetative", progress: 45, color: "hsl(142,71%,45%)" },
  { name: "Succulents", stage: "Rooting", progress: 20, color: "hsl(var(--primary))" },
  { name: "Poinsettias", stage: "Seedling", progress: 10, color: "hsl(38,92%,50%)" },
];

export function GrowingSchedule() {
  const { ref, size } = useContainerSize();
  const compact = size.width < 180;

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold font-display tracking-tight">Growing Schedule</h3>
        {!compact && <p className="text-[10px] text-muted-foreground mt-0.5">Crop progress</p>}
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {crops.map((crop) => (
          <div key={crop.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs truncate">{crop.name}</span>
              {!compact && <span className="text-[10px] text-muted-foreground">{crop.stage}</span>}
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${crop.progress}%`, background: crop.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
