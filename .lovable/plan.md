

## Production Scheduling Page

### Plant Production Stages

Based on nursery industry standards, the stages are:

1. **Propagation** — Seed sowing, cutting, or tissue culture
2. **Germination** — Seeds sprout / cuttings root
3. **Transplanting** — Move to larger containers
4. **Vegetative Growth** — Active leaf/stem development
5. **Hardening Off** — Acclimate to outdoor conditions
6. **Flowering / Fruiting** — Bloom stage (if applicable)
7. **Ready for Retail** — Market-ready, staged for sale
8. **Shipped** — Dispatched to customer/retail location

### UX Approach — Gantt-style Calendar

The most intuitive view for production managers is a **horizontal Gantt timeline** where each row is a crop batch and colored bars span the weeks each stage occupies. This mirrors how growers think: "Week 12 I sow petunias, week 16 I transplant, week 22 they're retail-ready."

### Files to Create/Edit

**1. `src/types/production.ts`** — Types
- `ProductionStage` enum (8 stages above)
- `CropBatch` type: `{ id, cropName, greenhouse, stages: { stage, startDate, endDate }[], notes }`

**2. `src/hooks/useProductionSchedule.ts`** — State hook
- Manages array of `CropBatch` items (local state with mock data for now)
- CRUD operations: add batch, edit batch, delete batch

**3. `src/components/production/GanttTimeline.tsx`** — Main calendar view
- Horizontal scrollable timeline (columns = weeks, configurable range)
- Each row = one crop batch; colored bars per stage
- Stage colors are consistent (e.g., green for vegetative, orange for hardening, purple for flowering)
- Click a bar to edit that stage's dates
- Week/month toggle for zoom level

**4. `src/components/production/BatchFormModal.tsx`** — Add/edit crop batch
- Fields: crop name, greenhouse (dropdown), notes
- For each stage: start date and end date pickers
- Auto-suggest stage durations based on crop type (stretch goal)

**5. `src/components/production/StageTag.tsx`** — Small colored badge component for stage labels

**6. `src/pages/ProductionScheduling.tsx`** — Page shell
- Reuses the same sidebar/nav layout from `Home.tsx` (extract a shared `AppLayout` wrapper)
- Header with title + "Add Batch" button
- Filter bar: filter by greenhouse, crop name, current stage
- `<GanttTimeline />` as the main content area
- Mobile: vertical card list grouped by week (Gantt not practical on small screens)

**7. `src/components/layout/AppLayout.tsx`** — Extract shared layout
- Pull the sidebar, mobile header, and bottom nav out of `Home.tsx` into a reusable layout component
- Both `Home.tsx` and `ProductionScheduling.tsx` will use it

**8. `src/App.tsx`** — Add route
- Add `/production-scheduling` route
- Add nav item to `navItems` in the shared layout

**9. `src/pages/Home.tsx`** — Update nav
- Add "Production" to `navItems` with a `Calendar` icon

### Visual Summary

```text
┌─ Sidebar ─┬─────────────────────────────────────────────┐
│ Home      │  Production Scheduling    [+ Add Batch]     │
│ Prod Sched│  ┌─ Filters: Greenhouse ▼  Crop ▼  Stage ▼ │
│ Call Flows│  ├──────────────────────────────────────────│
│ Messages  │  │  Wk12  Wk13  Wk14  Wk15  Wk16  Wk17   │
│           │  │ Petunias ████████████████████████████     │
│           │  │ Tomatoes      ██████████████████████████  │
│           │  │ Herbs            ████████████             │
│           │  │ Succulents ████████████████████████       │
│           │  └──────────────────────────────────────────│
└───────────┴─────────────────────────────────────────────┘
   Legend: ■ Propagation ■ Germination ■ Transplant ■ Growth ■ Hardening ■ Flowering ■ Retail ■ Shipped
```

### Key Interactions
- **Drag bar edges** to adjust stage start/end dates inline
- **Click a row** to open the batch detail/edit modal
- **Hover a bar segment** to see stage name, dates, and duration tooltip
- **Filter bar** narrows visible batches by greenhouse or stage
- **Week/Month toggle** controls zoom level on the timeline

