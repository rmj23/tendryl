const items = [
  { name: "4\" Pots", stock: 2400, capacity: 5000, unit: "pcs" },
  { name: "Potting Mix", stock: 180, capacity: 500, unit: "bags" },
  { name: "Fertilizer 20-20-20", stock: 12, capacity: 50, unit: "bags" },
  { name: "Plant Tags", stock: 8500, capacity: 10000, unit: "pcs" },
  { name: "Hanging Baskets", stock: 45, capacity: 200, unit: "pcs" },
];

export function InventoryWidget() {
  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(0,0%,12%)]">
        <h3 className="text-sm font-semibold font-display tracking-tight">Inventory</h3>
        <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">Supply levels</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {items.map((item) => {
          const pct = Math.round((item.stock / item.capacity) * 100);
          const low = pct < 30;
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs">{item.name}</span>
                <span className={`text-[10px] ${low ? "text-[#ef4444]" : "text-[hsl(0,0%,45%)]"}`}>
                  {item.stock.toLocaleString()} {item.unit}
                </span>
              </div>
              <div className="h-1 rounded-full bg-[hsl(0,0%,12%)]">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    background: low ? "#ef4444" : "#00B8A9",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
