import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { GanttTimeline } from "@/components/production/GanttTimeline";
import { BatchFormModal } from "@/components/production/BatchFormModal";
import { useProductionSchedule } from "@/hooks/useProductionSchedule";
import { useIsMobile } from "@/hooks/use-mobile";
import { CropBatch, GREENHOUSES, ALL_STAGES, STAGE_LABELS, STAGE_HEX, ProductionStage } from "@/types/production";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { StageTag } from "@/components/production/StageTag";
import { format, parseISO, differenceInDays } from "date-fns";

export default function ProductionScheduling() {
  const { batches, addBatch, updateBatch, deleteBatch } = useProductionSchedule();
  const isMobile = useIsMobile();

  const [modalOpen, setModalOpen] = useState(false);
  const [editBatch, setEditBatch] = useState<CropBatch | null>(null);
  const [filterGreenhouse, setFilterGreenhouse] = useState("");
  const [filterCrop, setFilterCrop] = useState("");
  const [filterStage, setFilterStage] = useState("");

  const handleClickBatch = (batch: CropBatch) => {
    setEditBatch(batch);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditBatch(null);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<CropBatch, "id">) => {
    if (editBatch) {
      updateBatch(editBatch.id, data);
    } else {
      addBatch(data);
    }
  };

  return (
    <AppLayout
      title="Production Scheduling"
      subtitle="Plan and track crop batches through every growth stage."
      headerRight={
        <Button size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" /> Add Batch
        </Button>
      }
    >
      {/* Filter bar */}
      <div className="px-4 md:px-6 py-2.5 border-b border-border bg-card flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <Select value={filterGreenhouse} onValueChange={(v) => setFilterGreenhouse(v === "all" ? "" : v)}>
          <SelectTrigger className="h-8 w-full sm:w-[150px] text-xs">
            <SelectValue placeholder="All Greenhouses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Greenhouses</SelectItem>
            {GREENHOUSES.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStage} onValueChange={(v) => setFilterStage(v === "all" ? "" : v)}>
          <SelectTrigger className="h-8 w-full sm:w-[160px] text-xs">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {ALL_STAGES.map((s) => (
              <SelectItem key={s} value={s}>{STAGE_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            className="h-8 pl-7 w-full sm:w-[160px] text-xs"
            placeholder="Search crop..."
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {isMobile ? (
        <MobileScheduleList
          batches={batches}
          onClickBatch={handleClickBatch}
          filterGreenhouse={filterGreenhouse}
          filterCrop={filterCrop}
          filterStage={filterStage}
        />
      ) : (
        <div className="flex-1 min-h-0">
          <GanttTimeline
            batches={batches}
            onClickBatch={handleClickBatch}
            filterGreenhouse={filterGreenhouse}
            filterCrop={filterCrop}
            filterStage={filterStage}
          />
        </div>
      )}

      <BatchFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        batch={editBatch}
        onSave={handleSave}
        onDelete={deleteBatch}
      />
    </AppLayout>
  );
}

function MobileScheduleList({
  batches,
  onClickBatch,
  filterGreenhouse,
  filterCrop,
  filterStage,
}: {
  batches: CropBatch[];
  onClickBatch: (b: CropBatch) => void;
  filterGreenhouse: string;
  filterCrop: string;
  filterStage: string;
}) {
  const filtered = batches.filter((b) => {
    if (filterGreenhouse && b.greenhouse !== filterGreenhouse) return false;
    if (filterCrop && !b.cropName.toLowerCase().includes(filterCrop.toLowerCase())) return false;
    if (filterStage && !b.stages.some((s) => s.stage === filterStage)) return false;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-12">No crop batches found.</p>
      )}
      {filtered.map((batch) => (
        <div
          key={batch.id}
          className="rounded-xl border border-border bg-card p-3 space-y-2 cursor-pointer hover:bg-muted/40 transition-colors"
          onClick={() => onClickBatch(batch)}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">{batch.cropName}</span>
            <span className="text-[10px] text-muted-foreground">{batch.greenhouse}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {batch.stages.map((s, i) => (
              <StageTag key={i} stage={s.stage} compact />
            ))}
          </div>
          {batch.stages.length > 0 && (
            <p className="text-[10px] text-muted-foreground">
              {format(parseISO(batch.stages[0].startDate), "MMM d")} –{" "}
              {format(parseISO(batch.stages[batch.stages.length - 1].endDate), "MMM d, yyyy")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
