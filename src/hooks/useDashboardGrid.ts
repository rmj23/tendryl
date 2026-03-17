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

type DragPhase = "idle" | "dragging" | "dropping";

function intersects(a: WidgetLayout, b: WidgetLayout): boolean {
  return !(
    a.col + a.colSpan <= b.col ||
    b.col + b.colSpan <= a.col ||
    a.row + a.rowSpan <= b.row ||
    b.row + b.rowSpan <= a.row
  );
}

function isOutOfBounds(layout: WidgetLayout, cols: number, maxRows: number): boolean {
  return (
    layout.col < 1 ||
    layout.row < 1 ||
    layout.col + layout.colSpan - 1 > cols ||
    layout.row + layout.rowSpan - 1 > maxRows
  );
}

function resolveWithReflow(
  sourceLayouts: WidgetLayout[],
  candidate: WidgetLayout,
  cols: number,
  maxRows: number
): WidgetLayout[] | null {
  if (isOutOfBounds(candidate, cols, maxRows)) return null;

  const next = sourceLayouts.map((layout) =>
    layout.id === candidate.id ? { ...candidate } : { ...layout }
  );

  const queue: string[] = [candidate.id];
  while (queue.length > 0) {
    const currentId = queue.shift();
    const current = next.find((item) => item.id === currentId);
    if (!current) continue;
    if (isOutOfBounds(current, cols, maxRows)) return null;

    for (const other of next) {
      if (other.id === current.id) continue;
      if (!intersects(current, other)) continue;

      const displacedRow = current.row + current.rowSpan;
      if (other.row !== displacedRow) {
        other.row = displacedRow;
        if (isOutOfBounds(other, cols, maxRows)) return null;
      }
      queue.push(other.id);
    }
  }

  return next;
}

export function useDashboardGrid(
  initialLayouts: WidgetLayout[],
  cols: number = 12,
  maxRows: number = 12,
  rowHeight: number = 80
) {
  const [layouts, setLayouts] = useState<WidgetLayout[]>(initialLayouts);
  const dragStateRef = useRef<DragState | null>(null);
  const dropTimeoutRef = useRef<number | null>(null);
  const previewLayoutsRef = useRef<WidgetLayout[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragPhase, setDragPhase] = useState<DragPhase>("idle");
  const [previewLayouts, setPreviewLayouts] = useState<WidgetLayout[] | null>(null);
  const [dropTarget, setDropTarget] = useState<WidgetLayout | null>(null);

  const getCellSize = useCallback(
    (containerEl: HTMLElement) => {
      const rect = containerEl.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rowHeight;
      return { cellW, cellH, left: rect.left, top: rect.top };
    },
    [cols, rowHeight]
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
      setDragPhase("dragging");

      if (dropTimeoutRef.current !== null) {
        window.clearTimeout(dropTimeoutRef.current);
        dropTimeoutRef.current = null;
      }

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

        const resolved = resolveWithReflow(layouts, candidate, cols, maxRows);
        if (resolved) {
          setDropTarget(candidate);
          previewLayoutsRef.current = resolved;
          setPreviewLayouts(resolved);
        }
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        dragStateRef.current = null;
        setDragPhase("dropping");
        setLayouts((ls) => previewLayoutsRef.current ?? ls);
        previewLayoutsRef.current = null;
        setPreviewLayouts(null);
        setDropTarget(null);
        dropTimeoutRef.current = window.setTimeout(() => {
          setActiveId(null);
          setDragPhase("idle");
          dropTimeoutRef.current = null;
        }, 360);
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
      setDragPhase("dragging");

      if (dropTimeoutRef.current !== null) {
        window.clearTimeout(dropTimeoutRef.current);
        dropTimeoutRef.current = null;
      }

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

        const resolved = resolveWithReflow(layouts, candidate, cols, maxRows);
        if (resolved) {
          setDropTarget(candidate);
          previewLayoutsRef.current = resolved;
          setPreviewLayouts(resolved);
        }
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        dragStateRef.current = null;
        setDragPhase("dropping");
        setLayouts((ls) => previewLayoutsRef.current ?? ls);
        previewLayoutsRef.current = null;
        setPreviewLayouts(null);
        setDropTarget(null);
        dropTimeoutRef.current = window.setTimeout(() => {
          setActiveId(null);
          setDragPhase("idle");
          dropTimeoutRef.current = null;
        }, 360);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [layouts, cols, maxRows, getCellSize]
  );

  const getLayout = useCallback(
    (id: string): WidgetLayout | undefined => {
      const source = previewLayouts ?? layouts;
      return source.find((l) => l.id === id);
    },
    [layouts, previewLayouts]
  );

  return {
    layouts,
    activeId,
    dragPhase,
    dropTarget,
    startDrag,
    startResize,
    getLayout,
    setLayouts,
  };
}
