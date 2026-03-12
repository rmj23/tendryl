const crops = [
  { name: "Petunias", stage: "Transplant", progress: 75, days: 12, color: "#a855f7" },
  { name: "Tomatoes", stage: "Vegetative", progress: 45, days: 28, color: "#ef4444" },
  { name: "Marigolds", stage: "Germination", progress: 20, days: 5, color: "#f59e0b" },
  { name: "Basil", stage: "Hardening", progress: 90, days: 3, color: "#22c55e" },
  { name: "Impatiens", stage: "Flowering", progress: 95, days: 2, color: "#ec4899" },
];

export function GrowingSchedule() {
  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(0,0%,12%)]">
        <h3 className="text-sm font-semibold font-display tracking-tight">Growing Schedule</h3>
        <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">Active crop cycles</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {crops.map((crop) => (
          <div key={crop.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">{crop.name}</span>
              <span className="text-[10px] text-[hsl(0,0%,45%)]">{crop.days}d left</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-[hsl(0,0%,12%)]">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${crop.progress}%`, background: crop.color }}
                />
              </div>
              <span className="text-[9px] text-[hsl(0,0%,40%)] w-16 text-right">{crop.stage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
