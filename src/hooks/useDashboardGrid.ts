import { useState, useCallback, useRef } from "react";

export interface WidgetLayout {
  id: string;
  col: number; // 1-based
  row: number; // 1-based
  colSpan: number;
  rowSpan: number;
  minW?: number;
  minH?: number;
}

interface DragState {
  widgetId: string;
  startMouseX: number;
  startMouseY: number;
  startCol: number;
  startRow: number;
  mode: "drag" | "resize";
  startColSpan?: number;
  startRowSpan?: number;
}

function cellsOccupied(layout: WidgetLayout): Set<string> {
  const cells = new Set<string>();
  for (let c = layout.col; c < layout.col + layout.colSpan; c++) {
    for (let r = layout.row; r < layout.row + layout.rowSpan; r++) {
      cells.add(`${c},${r}`);
    }
  }
  return cells;
}

function hasCollision(
  layouts: WidgetLayout[],
  target: WidgetLayout,
  cols: number,
  maxRows: number
): boolean {
  // Check bounds
  if (target.col < 1 || target.row < 1) return true;
  if (target.col + target.colSpan - 1 > cols) return true;
  if (target.row + target.rowSpan - 1 > maxRows) return true;

  const targetCells = cellsOccupied(target);
  for (const layout of layouts) {
    if (layout.id === target.id) continue;
    const otherCells = cellsOccupied(layout);
    for (const cell of targetCells) {
      if (otherCells.has(cell)) return true;
    }
  }
  return false;
}

export function useDashboardGrid(
  initialLayouts: WidgetLayout[],
  cols: number = 12,
  maxRows: number = 12
) {
  const [layouts, setLayouts] = useState<WidgetLayout[]>(initialLayouts);
  const dragStateRef = useRef<DragState | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [preview, setPreview] = useState<WidgetLayout | null>(null);

  const getCellSize = useCallback(
    (containerEl: HTMLElement) => {
      const rect = containerEl.getBoundingClientRect();
      const cellW = rect.width / cols;
      // Use a fixed row height based on container
      const cellH = 80;
      return { cellW, cellH, left: rect.left, top: rect.top };
    },
    [cols]
  );

  const startDrag = useCallback(
    (
      e: React.PointerEvent,
      widgetId: string,
      containerEl: HTMLElement
    ) => {
      e.preventDefault();
      e.stopPropagation();
      const widget = layouts.find((l) => l.id === widgetId);
      if (!widget) return;

      dragStateRef.current = {
        widgetId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startCol: widget.col,
        startRow: widget.row,
        mode: "drag",
      };
      setActiveId(widgetId);

      const onMove = (ev: PointerEvent) => {
        const state = dragStateRef.current;
        if (!state || state.mode !== "drag") return;
        const { cellW, cellH } = getCellSize(containerEl);
        const dx = ev.clientX - state.startMouseX;
        const dy = ev.clientY - state.startMouseY;
        const colDelta = Math.round(dx / cellW);
        const rowDelta = Math.round(dy / cellH);
        const newCol = state.startCol + colDelta;
        const newRow = state.startRow + rowDelta;

        const candidate: WidgetLayout = {
          ...widget,
          col: newCol,
          row: newRow,
        };

        if (!hasCollision(layouts, candidate, cols, maxRows)) {
          setPreview(candidate);
        }
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        dragStateRef.current = null;
        setActiveId(null);
        setPreview((prev) => {
          if (prev) {
            setLayouts((ls) =>
              ls.map((l) =>
                l.id === widgetId
                  ? { ...l, col: prev.col, row: prev.row }
                  : l
              )
            );
          }
          return null;
        });
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [layouts, cols, maxRows, getCellSize]
  );

  const startResize = useCallback(
    (
      e: React.PointerEvent,
      widgetId: string,
      containerEl: HTMLElement
    ) => {
      e.preventDefault();
      e.stopPropagation();
      const widget = layouts.find((l) => l.id === widgetId);
      if (!widget) return;

      dragStateRef.current = {
        widgetId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startCol: widget.col,
        startRow: widget.row,
        startColSpan: widget.colSpan,
        startRowSpan: widget.rowSpan,
        mode: "resize",
      };
      setActiveId(widgetId);

      const onMove = (ev: PointerEvent) => {
        const state = dragStateRef.current;
        if (!state || state.mode !== "resize") return;
        const { cellW, cellH } = getCellSize(containerEl);
        const dx = ev.clientX - state.startMouseX;
        const dy = ev.clientY - state.startMouseY;
        const colDelta = Math.round(dx / cellW);
        const rowDelta = Math.round(dy / cellH);
        const newColSpan = Math.max(
          widget.minW || 1,
          (state.startColSpan || widget.colSpan) + colDelta
        );
        const newRowSpan = Math.max(
          widget.minH || 1,
          (state.startRowSpan || widget.rowSpan) + rowDelta
        );

        const candidate: WidgetLayout = {
          ...widget,
          colSpan: newColSpan,
          rowSpan: newRowSpan,
        };

        if (!hasCollision(layouts, candidate, cols, maxRows)) {
          setPreview(candidate);
        }
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        dragStateRef.current = null;
        setActiveId(null);
        setPreview((prev) => {
          if (prev) {
            setLayouts((ls) =>
              ls.map((l) =>
                l.id === widgetId
                  ? { ...l, colSpan: prev.colSpan, rowSpan: prev.rowSpan }
                  : l
              )
            );
          }
          return null;
        });
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [layouts, cols, maxRows, getCellSize]
  );

  const getLayout = useCallback(
    (id: string): WidgetLayout | undefined => {
      if (preview && preview.id === id) return preview;
      return layouts.find((l) => l.id === id);
    },
    [layouts, preview]
  );

  return {
    layouts,
    activeId,
    preview,
    startDrag,
    startResize,
    getLayout,
    setLayouts,
  };
}
