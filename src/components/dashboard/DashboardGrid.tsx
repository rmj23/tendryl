import React, { useRef } from "react";
import { useDashboardGrid, WidgetLayout } from "@/hooks/useDashboardGrid";
import { GripVertical } from "lucide-react";

interface WidgetConfig {
  id: string;
  component: React.ReactNode;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  minW?: number;
  minH?: number;
}

interface DashboardGridProps {
  widgets: WidgetConfig[];
  cols?: number;
  rowHeight?: number;
  maxRows?: number;
}

export function DashboardGrid({
  widgets,
  cols = 12,
  rowHeight = 80,
  maxRows = 12,
}: DashboardGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const initialLayouts: WidgetLayout[] = widgets.map((w) => ({
    id: w.id,
    col: w.col,
    row: w.row,
    colSpan: w.colSpan,
    rowSpan: w.rowSpan,
    minW: w.minW,
    minH: w.minH,
  }));

  const { activeId, startDrag, startResize, getLayout } = useDashboardGrid(
    initialLayouts,
    cols,
    maxRows
  );

  // Compute total rows needed
  const totalRows = Math.max(
    ...widgets.map((w) => {
      const layout = getLayout(w.id);
      return layout ? layout.row + layout.rowSpan - 1 : w.row + w.rowSpan - 1;
    }),
    1
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${totalRows}, ${rowHeight}px)`,
        gap: "12px",
      }}
    >
      {widgets.map((widget) => {
        const layout = getLayout(widget.id) || widget;
        const isActive = activeId === widget.id;

        return (
          <div
            key={widget.id}
            className={`rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col transition-shadow ${
              isActive
                ? "shadow-lg ring-2 ring-primary/30 z-10"
                : "border-border"
            }`}
            style={{
              gridColumn: `${layout.col} / span ${layout.colSpan}`,
              gridRow: `${layout.row} / span ${layout.rowSpan}`,
            }}
          >
            {/* Drag handle */}
            <div
              className="flex items-center justify-center h-5 cursor-grab active:cursor-grabbing bg-muted/30 hover:bg-muted/60 transition-colors border-b border-border/50 flex-shrink-0"
              onPointerDown={(e) => {
                if (containerRef.current) {
                  startDrag(e, widget.id, containerRef.current);
                }
              }}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground/50" />
            </div>

            {/* Widget content */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {widget.component}
            </div>

            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20 group"
              style={{
                gridColumn: `${layout.col} / span ${layout.colSpan}`,
                gridRow: `${layout.row} / span ${layout.rowSpan}`,
              }}
              onPointerDown={(e) => {
                if (containerRef.current) {
                  startResize(e, widget.id, containerRef.current);
                }
              }}
            >
              <svg
                className="w-full h-full text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors"
                viewBox="0 0 16 16"
              >
                <path d="M14 14L8 14L14 8Z" fill="currentColor" />
                <path d="M14 14L11 14L14 11Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
