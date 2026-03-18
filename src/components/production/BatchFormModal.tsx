import { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  CropBatch,
  StageEntry,
  ProductionStage,
  ALL_STAGES,
  STAGE_LABELS,
  GREENHOUSES,
} from "@/types/production";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StageTag } from "./StageTag";

interface BatchFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batch?: CropBatch | null;
  onSave: (data: Omit<CropBatch, "id">) => void;
  onDelete?: (id: string) => void;
}

function emptyStageEntry(stage: ProductionStage): StageEntry {
  const today = format(new Date(), "yyyy-MM-dd");
  return { stage, startDate: today, endDate: today };
}

export function BatchFormModal({
  open,
  onOpenChange,
  batch,
  onSave,
  onDelete,
}: BatchFormModalProps) {
  const [cropName, setCropName] = useState(batch?.cropName ?? "");
  const [greenhouse, setGreenhouse] = useState(batch?.greenhouse ?? GREENHOUSES[0]);
  const [notes, setNotes] = useState(batch?.notes ?? "");
  const [stages, setStages] = useState<StageEntry[]>(
    batch?.stages ?? [emptyStageEntry(ProductionStage.Propagation)]
  );

  // Reset on open
  const handleOpenChange = (v: boolean) => {
    if (v && batch) {
      setCropName(batch.cropName);
      setGreenhouse(batch.greenhouse);
      setNotes(batch.notes);
      setStages(batch.stages);
    } else if (v) {
      setCropName("");
      setGreenhouse(GREENHOUSES[0]);
      setNotes("");
      setStages([emptyStageEntry(ProductionStage.Propagation)]);
    }
    onOpenChange(v);
  };

  const updateStage = (index: number, updates: Partial<StageEntry>) => {
    setStages((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s))
    );
  };

  const addStage = () => {
    const usedStages = new Set(stages.map((s) => s.stage));
    const next = ALL_STAGES.find((s) => !usedStages.has(s));
    if (next) setStages((prev) => [...prev, emptyStageEntry(next)]);
  };

  const removeStage = (index: number) => {
    setStages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!cropName.trim()) return;
    onSave({ cropName: cropName.trim(), greenhouse, notes, stages });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{batch ? "Edit Crop Batch" : "Add Crop Batch"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Crop Name</Label>
              <Input value={cropName} onChange={(e) => setCropName(e.target.value)} placeholder="e.g. Petunias" />
            </div>
            <div className="space-y-1.5">
              <Label>Greenhouse</Label>
              <Select value={greenhouse} onValueChange={setGreenhouse}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GREENHOUSES.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." rows={2} />
          </div>

          {/* Stages */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Stages</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addStage} disabled={stages.length >= ALL_STAGES.length}>
                <Plus className="h-3 w-3 mr-1" /> Add Stage
              </Button>
            </div>

            {stages.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2 bg-muted/30">
                <div className="w-[140px] shrink-0">
                  <Select
                    value={entry.stage}
                    onValueChange={(v) => updateStage(i, { stage: v as ProductionStage })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_STAGES.map((s) => (
                        <SelectItem key={s} value={s} className="text-xs">
                          {STAGE_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <DatePickerField
                  label="Start"
                  value={entry.startDate}
                  onChange={(d) => updateStage(i, { startDate: d })}
                />
                <DatePickerField
                  label="End"
                  value={entry.endDate}
                  onChange={(d) => updateStage(i, { endDate: d })}
                />

                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeStage(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          {batch && onDelete && (
            <Button variant="destructive" size="sm" onClick={() => { onDelete(batch.id); onOpenChange(false); }}>
              Delete Batch
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!cropName.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DatePickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const date = value ? parseISO(value) : undefined;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 text-[10px] px-2 justify-start gap-1", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="h-3 w-3" />
          {date ? format(date, "MMM d") : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && onChange(format(d, "yyyy-MM-dd"))}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}
