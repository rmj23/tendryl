

## Plan: Individually Draggable & Resizable Dashboard Widgets

### Problem
The current `react-resizable-panels` layout only allows resizing along shared axes — not individual widget drag-and-drop or independent height/width control. Previous attempts with `react-grid-layout` failed due to ESM export issues (`WidthProvider` not available in its ESM bundle).

### Approach
Build a custom grid-based dashboard using **CSS Grid snapping** with a custom drag-and-resize system, avoiding problematic third-party grid layout libraries entirely.

**Core mechanism:**
- Define a virtual grid (e.g., 12 columns × N rows, each cell ~80px)
- Each widget has a grid position (`col`, `row`) and size (`colSpan`, `rowSpan`)
- Drag: use native pointer events to move widgets, snapping to grid cells
- Resize: add a resize handle to each widget's corner, snapping size to grid units
- Collision detection: before placing a widget, check that no other widget occupies those cells; if blocked, revert to previous position

### Changes

**1. New file: `src/hooks/useDashboardGrid.ts`**
- Custom hook managing widget layout state (positions, sizes)
- Grid snapping logic (pointer position → grid cell)
- Collision detection (occupancy map to prevent overlaps)
- Handlers for drag start/move/end and resize start/move/end

**2. New file: `src/components/dashboard/DashboardGrid.tsx`**
- Renders a CSS Grid container with `grid-template-columns: repeat(12, 1fr)`
- Maps each widget config to a positioned `<div>` using `grid-column` / `grid-row`
- During drag/resize, uses `position: absolute` with transform for smooth movement, then snaps back to grid on drop
- Each widget gets a drag handle (top bar) and a resize handle (bottom-right corner)

**3. Edit: `src/pages/Home.tsx`**
- Replace `ResizablePanelGroup` desktop layout with `<DashboardGrid>` component
- Define default widget configs: `{ id, component, col, row, colSpan, rowSpan, minW, minH }`
- Mobile layout stays as-is (stacked, no drag/resize)

**4. Widget content responsiveness**
- Each widget wrapper passes its actual pixel dimensions via a `ResizeObserver`
- Widgets receive container dimensions and adapt content accordingly (e.g., WeatherWidget hides the 3-col stats grid when narrow, GreenhouseMap scales SVG viewBox, ProductionStats switches from 4-col to 2-col when small)
- Add a `useContainerSize` hook that returns `{ width, height }` using `ResizeObserver`

**5. Edit widget components** (all 7 widgets)
- Wrap each in `useContainerSize` to get dimensions
- Add conditional rendering: hide secondary content when small, adjust grid columns, scale text sizes

### Default Layout (12-col grid, ~80px row height)
```text
┌─────────────── Production Stats (12 cols × 1 row) ───────────────┐
├──── Map (8 cols × 4 rows) ────┬── Weather (4c × 2r) ────────────┤
│                                ├── Alerts (4c × 2r) ─────────────┤
├── Tasks (4c × 3r) ─┬─ Schedule (3c × 3r) ┬─ Inventory (3c × 3r) ┬─ Water (2c × 3r) ┤
└─────────────────────┴────────────────────┴──────────────────────┴──────────────────┘
```

### No external dependencies needed
Uses only native browser APIs (pointer events, ResizeObserver, CSS Grid). Removes `react-resizable-panels` usage from the dashboard (keeps the component available for other pages).

