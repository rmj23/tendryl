

## Plan: Responsive & Resizable Dashboard

### Approach

Use `react-resizable-panels` (already installed) to make widgets resizable, and Tailwind responsive classes for mobile/tablet layouts. The sidebar will collapse to a bottom nav on mobile.

### Changes

**1. `src/pages/Home.tsx` — Major rewrite**
- **Mobile sidebar**: Hide the sidebar on screens < 768px, show a bottom navigation bar instead
- **Responsive grid**: Use Tailwind responsive breakpoints (`grid-cols-1 md:grid-cols-2 lg:grid-cols-12`) so widgets stack on mobile, 2-col on tablet, full grid on desktop
- **Resizable panels**: Wrap the main grid rows in `ResizablePanelGroup` with `ResizablePanel` + `ResizableHandle` from the existing `react-resizable-panels` library. Each row becomes a horizontal panel group where widgets can be resized relative to each other. Vertical resizing between rows handled by a vertical panel group wrapping everything.

**2. Layout structure**
```text
<ResizablePanelGroup direction="vertical">
  ├─ ProductionStats (fixed row, no resize)
  ├─ ResizablePanel (top row)
  │   └─ <ResizablePanelGroup direction="horizontal">
  │       ├─ Panel: GreenhouseMap
  │       ├─ Handle
  │       └─ Panel: Weather + Alerts stacked
  ├─ Handle
  └─ ResizablePanel (bottom row)
      └─ <ResizablePanelGroup direction="horizontal">
          ├─ Panel: Tasks
          ├─ Handle
          ├─ Panel: GrowingSchedule
          ├─ Handle
          ├─ Panel: Inventory
          ├─ Handle
          └─ Panel: WaterUsage
</ResizablePanelGroup>
```

On mobile/tablet: skip the resizable panels, use a simple stacked/2-col grid instead (resizing doesn't make sense on small screens).

**3. Responsive sidebar**
- Desktop (lg+): Current 200px sidebar
- Mobile/Tablet: Hidden sidebar, replaced with a fixed bottom nav bar with icons

**4. Widget components** — No changes needed; they already use `h-full flex flex-col` which works with resizable containers.

