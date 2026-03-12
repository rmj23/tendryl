import { Thermometer, Droplets } from "lucide-react";

interface SensorData {
  temp: number;
  humidity: number;
}

interface Greenhouse {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zones: { id: string; x: number; y: number; sensor: SensorData }[];
}

const greenhouses: Greenhouse[] = [
  {
    id: "gh-1", name: "Greenhouse A", x: 30, y: 30, w: 260, h: 140,
    zones: [
      { id: "z1", x: 15, y: 35, sensor: { temp: 72, humidity: 68 } },
      { id: "z2", x: 140, y: 35, sensor: { temp: 74, humidity: 71 } },
      { id: "z3", x: 15, y: 85, sensor: { temp: 70, humidity: 65 } },
      { id: "z4", x: 140, y: 85, sensor: { temp: 73, humidity: 69 } },
    ],
  },
  {
    id: "gh-2", name: "Greenhouse B", x: 320, y: 30, w: 200, h: 140,
    zones: [
      { id: "z5", x: 15, y: 35, sensor: { temp: 78, humidity: 75 } },
      { id: "z6", x: 105, y: 35, sensor: { temp: 76, humidity: 73 } },
      { id: "z7", x: 15, y: 85, sensor: { temp: 77, humidity: 74 } },
    ],
  },
  {
    id: "gh-3", name: "Greenhouse C", x: 30, y: 200, w: 320, h: 120,
    zones: [
      { id: "z8", x: 15, y: 35, sensor: { temp: 69, humidity: 62 } },
      { id: "z9", x: 115, y: 35, sensor: { temp: 71, humidity: 66 } },
      { id: "z10", x: 215, y: 35, sensor: { temp: 68, humidity: 60 } },
    ],
  },
  {
    id: "gh-4", name: "Propagation House", x: 380, y: 200, w: 140, h: 120,
    zones: [
      { id: "z11", x: 15, y: 35, sensor: { temp: 80, humidity: 85 } },
      { id: "z12", x: 15, y: 75, sensor: { temp: 82, humidity: 88 } },
    ],
  },
];

function SensorSquare({ sensor, x, y }: { sensor: SensorData; x: number; y: number }) {
  const tempColor = sensor.temp > 78 ? "#ef4444" : sensor.temp < 68 ? "#3b82f6" : "#00B8A9";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="105" height="42" rx="4" fill="hsl(0,0%,8%)" stroke="hsl(0,0%,18%)" strokeWidth="1" />
      <g transform="translate(8, 10)">
        <circle cx="4" cy="5" r="3" fill={tempColor} opacity="0.7" />
        <text x="12" y="9" fill="hsl(0,0%,70%)" fontSize="10" fontFamily="monospace">{sensor.temp}°F</text>
      </g>
      <g transform="translate(8, 26)">
        <circle cx="4" cy="5" r="3" fill="#3b82f6" opacity="0.5" />
        <text x="12" y="9" fill="hsl(0,0%,55%)" fontSize="10" fontFamily="monospace">{sensor.humidity}%</text>
      </g>
    </g>
  );
}

export function GreenhouseMap() {
  return (
    <div className="rounded-xl border border-[hsl(0,0%,12%)] bg-[hsl(0,0%,6%)]/80 backdrop-blur-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[hsl(0,0%,12%)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight">Facility Map</h3>
          <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">Bird's eye view · Live sensor data</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[hsl(0,0%,45%)]">
          <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> Temp</span>
          <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</span>
        </div>
      </div>
      <div className="p-4">
        <svg viewBox="0 0 560 350" className="w-full h-auto">
          {/* Grid dots */}
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 12 }).map((_, j) => (
              <circle key={`${i}-${j}`} cx={i * 30} cy={j * 30} r="0.5" fill="hsl(0,0%,18%)" />
            ))
          )}

          {greenhouses.map((gh) => (
            <g key={gh.id}>
              {/* Greenhouse outline */}
              <rect
                x={gh.x} y={gh.y} width={gh.w} height={gh.h}
                rx="6" fill="none" stroke="#00B8A9" strokeWidth="1.5" opacity="0.6"
              />
              {/* Fill */}
              <rect
                x={gh.x} y={gh.y} width={gh.w} height={gh.h}
                rx="6" fill="#00B8A9" opacity="0.04"
              />
              {/* Label */}
              <text
                x={gh.x + 10} y={gh.y + 16}
                fill="#00B8A9" fontSize="11" fontWeight="600" opacity="0.8"
              >
                {gh.name}
              </text>
              {/* Sensor zones */}
              {gh.zones.map((zone) => (
                <SensorSquare key={zone.id} sensor={zone.sensor} x={gh.x + zone.x} y={gh.y + zone.y} />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
