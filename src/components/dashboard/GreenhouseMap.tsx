import { Thermometer, Droplets } from "lucide-react";

interface Greenhouse {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  temp: number;
  humidity: number;
}

const greenhouses: Greenhouse[] = [
  { id: "gh-1", name: "Greenhouse A", x: 30, y: 30, w: 260, h: 140, temp: 72, humidity: 68 },
  { id: "gh-2", name: "Greenhouse B", x: 320, y: 30, w: 200, h: 140, temp: 78, humidity: 75 },
  { id: "gh-3", name: "Greenhouse C", x: 30, y: 200, w: 320, h: 120, temp: 69, humidity: 62 },
  { id: "gh-4", name: "Propagation House", x: 380, y: 200, w: 140, h: 120, temp: 80, humidity: 85 },
];

function SensorBoxes({ gh }: { gh: Greenhouse }) {
  const tempColor = gh.temp > 78 ? "#ef4444" : gh.temp < 68 ? "#3b82f6" : "#00B8A9";
  const cx = gh.w / 2;
  return (
    <>
      {/* Temp box */}
      <g transform={`translate(${cx - 55}, ${gh.h - 34})`}>
        <rect width="48" height="22" rx="4" fill="white" stroke="hsl(220,15%,88%)" strokeWidth="1" />
        <circle cx="12" cy="11" r="3" fill={tempColor} opacity="0.8" />
        <text x="20" y="14" fill="hsl(220,15%,30%)" fontSize="10" fontFamily="monospace">{gh.temp}°F</text>
      </g>
      {/* Humidity box */}
      <g transform={`translate(${cx + 7}, ${gh.h - 34})`}>
        <rect width="48" height="22" rx="4" fill="white" stroke="hsl(220,15%,88%)" strokeWidth="1" />
        <circle cx="12" cy="11" r="3" fill="#3b82f6" opacity="0.6" />
        <text x="20" y="14" fill="hsl(220,15%,30%)" fontSize="10" fontFamily="monospace">{gh.humidity}%</text>
      </g>
    </>
  );
}

export function GreenhouseMap() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(220,15%,90%)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight text-[hsl(220,15%,15%)]">Facility Map</h3>
          <p className="text-[10px] text-[hsl(220,10%,55%)] mt-0.5">Bird's eye view · Live sensor data</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[hsl(220,10%,55%)]">
          <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> Temp</span>
          <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <svg viewBox="0 0 560 350" className="w-full h-auto">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 12 }).map((_, j) => (
              <circle key={`${i}-${j}`} cx={i * 30} cy={j * 30} r="0.5" fill="hsl(220,15%,85%)" />
            ))
          )}
          {greenhouses.map((gh) => (
            <g key={gh.id}>
              <rect x={gh.x} y={gh.y} width={gh.w} height={gh.h} rx="6" fill="none" stroke="#00B8A9" strokeWidth="1.5" opacity="0.7" />
              <rect x={gh.x} y={gh.y} width={gh.w} height={gh.h} rx="6" fill="#00B8A9" opacity="0.06" />
              <text x={gh.x + 10} y={gh.y + 18} fill="#00B8A9" fontSize="11" fontWeight="600" opacity="0.9">{gh.name}</text>
              <g transform={`translate(${gh.x}, ${gh.y})`}>
                <SensorBoxes gh={gh} />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
