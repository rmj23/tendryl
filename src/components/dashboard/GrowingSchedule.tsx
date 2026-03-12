const crops = [
  { name: "Petunias", stage: "Flowering", progress: 85, color: "#a855f7" },
  { name: "Tomatoes", stage: "Fruiting", progress: 70, color: "#ef4444" },
  { name: "Herbs Mix", stage: "Vegetative", progress: 45, color: "#22c55e" },
  { name: "Succulents", stage: "Rooting", progress: 20, color: "#00B8A9" },
  { name: "Poinsettias", stage: "Seedling", progress: 10, color: "#f59e0b" },
];

export function GrowingSchedule() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(220,15%,90%)]">
        <h3 className="text-sm font-semibold font-display tracking-tight text-[hsl(220,15%,15%)]">Growing Schedule</h3>
        <p className="text-[10px] text-[hsl(220,10%,55%)] mt-0.5">Crop progress</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {crops.map((crop) => (
          <div key={crop.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[hsl(220,15%,20%)]">{crop.name}</span>
              <span className="text-[10px] text-[hsl(220,10%,55%)]">{crop.stage}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[hsl(220,15%,92%)]">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${crop.progress}%`, background: crop.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
