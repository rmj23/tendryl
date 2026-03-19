import { useMemo, useRef, useState } from "react";
import {
  addWeeks,
  startOfWeek,
  differenceInDays,
  format,
  parseISO,
  isBefore,
  isAfter,
} from "date-fns";
import {
  CropBatch,
  STAGE_HEX,
  STAGE_LABELS,
  ProductionStage,
  GREENHOUSES,
} from "@/types/production";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GanttTimelineProps {
  batches: CropBatch[];
  onClickBatch: (batch: CropBatch) => void;
  filterGreenhouse: string;
  filterCrop: string;
  filterStage: string;
}

const WEEK_PX = 100;

export function GanttTimeline({
  batches,
  onClickBatch,
  filterGreenhouse,
  filterCrop,
  filterStage,
}: GanttTimelineProps) {
  const [zoom, setZoom] = useState<"week" | "month">("week");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compute timeline range from data
  const { timelineStart, totalWeeks, columns } = useMemo(() => {
    let earliest = new Date();
    let latest = new Date();
    batches.forEach((b) => {
      b.stages.forEach((s) => {
        const sd = parseISO(s.startDate);
        const ed = parseISO(s.endDate);
        if (isBefore(sd, earliest)) earliest = sd;
        if (isAfter(ed, latest)) latest = ed;
      });
    });
    const start = startOfWeek(addWeeks(earliest, -1), { weekStartsOn: 1 });
    const weeks = Math.max(Math.ceil(differenceInDays(addWeeks(latest, 2), start) / 7), 12);

    const cols: { label: string; weekIndex: number }[] = [];
    for (let i = 0; i < weeks; i++) {
      const d = addWeeks(start, i);
      if (zoom === "month") {
        const label = format(d, "MMM yyyy");
        if (cols.length === 0 || cols[cols.length - 1].label !== label) {
          cols.push({ label, weekIndex: i });
        }
      } else {
        cols.push({ label: `Wk ${format(d, "w")}`, weekIndex: i });
      }
    }
    return { timelineStart: start, totalWeeks: weeks, columns: cols };
  }, [batches, zoom]);

  // Filter
  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      if (filterGreenhouse && b.greenhouse !== filterGreenhouse) return false;
      if (filterCrop && !b.cropName.toLowerCase().includes(filterCrop.toLowerCase())) return false;
      if (filterStage && !b.stages.some((s) => s.stage === filterStage)) return false;
      return true;
    });
  }, [batches, filterGreenhouse, filterCrop, filterStage]);

  const cellWidth = zoom === "month" ? WEEK_PX * 4 : WEEK_PX;
  const totalWidth = zoom === "month" ? columns.length * cellWidth : totalWeeks * WEEK_PX;

  function getBarStyle(startDate: string, endDate: string) {
    const sd = parseISO(startDate);
    const ed = parseISO(endDate);
    const startDays = differenceInDays(sd, timelineStart);
    const durationDays = differenceInDays(ed, sd);
    const dayPx = WEEK_PX / 7;
    return {
      left: startDays * dayPx,
      width: Math.max(durationDays * dayPx, 6),
    };
  }

  return (
    <div className="flex flex-col h-full min-w-0 overflow-hidden">
      {/* Zoom toggle */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card shrink-0">
        <span className="text-xs text-muted-foreground font-medium mr-1">Zoom:</span>
        {(["week", "month"] as const).map((z) => (
          <button
            key={z}
            onClick={() => setZoom(z)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              zoom === z
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {z === "week" ? "Week" : "Month"}
          </button>
        ))}
        {/* Legend */}
        <div className="ml-auto flex flex-wrap gap-x-3 gap-y-1">
          {Object.values(ProductionStage).map((stage) => (
            <span key={stage} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: STAGE_HEX[stage] }}
              />
              {STAGE_LABELS[stage]}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-x-auto overflow-y-auto">
        <div style={{ minWidth: totalWidth + 200, width: 'max-content' }}>
          {/* Header row */}
          <div className="flex sticky top-0 z-10 bg-card border-b border-border">
            <div className="w-[200px] shrink-0 px-3 py-2 text-xs font-semibold text-muted-foreground border-r border-border">
              Crop Batch
            </div>
            <div className="flex">
              {columns.map((col, i) => (
                <div
                  key={i}
                  className="text-center text-[10px] text-muted-foreground py-2 border-r border-border font-medium"
                  style={{ width: zoom === "month" ? cellWidth : WEEK_PX }}
                >
                  {col.label}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {filteredBatches.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              No crop batches match your filters. Add a new batch to get started.
            </div>
          )}
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="flex border-b border-border hover:bg-muted/40 transition-colors cursor-pointer group"
              onClick={() => onClickBatch(batch)}
            >
              {/* Label */}
              <div className="w-[200px] shrink-0 px-3 py-3 border-r border-border">
                <div className="text-sm font-medium truncate">{batch.cropName}</div>
                <div className="text-[10px] text-muted-foreground">{batch.greenhouse}</div>
              </div>
              {/* Bars */}
              <div className="relative flex-1" style={{ height: 52 }}>
                {batch.stages.map((stageEntry, i) => {
                  const { left, width } = getBarStyle(stageEntry.startDate, stageEntry.endDate);
                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute top-2 h-7 rounded-md opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                          style={{
                            left,
                            width,
                            backgroundColor: STAGE_HEX[stageEntry.stage],
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-semibold">{STAGE_LABELS[stageEntry.stage]}</p>
                        <p className="text-muted-foreground">
                          {format(parseISO(stageEntry.startDate), "MMM d")} –{" "}
                          {format(parseISO(stageEntry.endDate), "MMM d, yyyy")}
                        </p>
                        <p className="text-muted-foreground">
                          {differenceInDays(parseISO(stageEntry.endDate), parseISO(stageEntry.startDate))} days
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
                {/* Grid lines */}
                {columns.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-r border-border/40"
                    style={{ left: zoom === "month" ? i * cellWidth : i * WEEK_PX }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
