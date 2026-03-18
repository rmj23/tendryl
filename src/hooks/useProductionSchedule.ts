import { useState, useCallback } from "react";
import { CropBatch, ProductionStage } from "@/types/production";
import { addWeeks, format } from "date-fns";

function makeDate(weeksFromNow: number) {
  return format(addWeeks(new Date("2026-03-02"), weeksFromNow), "yyyy-MM-dd");
}

const INITIAL_BATCHES: CropBatch[] = [
  {
    id: "1",
    cropName: "Petunias",
    greenhouse: "Greenhouse A",
    notes: "Spring bedding batch",
    stages: [
      { stage: ProductionStage.Propagation, startDate: makeDate(0), endDate: makeDate(2) },
      { stage: ProductionStage.Germination, startDate: makeDate(2), endDate: makeDate(4) },
      { stage: ProductionStage.Transplanting, startDate: makeDate(4), endDate: makeDate(5) },
      { stage: ProductionStage.VegetativeGrowth, startDate: makeDate(5), endDate: makeDate(9) },
      { stage: ProductionStage.HardeningOff, startDate: makeDate(9), endDate: makeDate(10) },
      { stage: ProductionStage.Flowering, startDate: makeDate(10), endDate: makeDate(13) },
      { stage: ProductionStage.ReadyForRetail, startDate: makeDate(13), endDate: makeDate(15) },
    ],
  },
  {
    id: "2",
    cropName: "Tomatoes",
    greenhouse: "Greenhouse B",
    notes: "Early season tomatoes",
    stages: [
      { stage: ProductionStage.Propagation, startDate: makeDate(1), endDate: makeDate(3) },
      { stage: ProductionStage.Germination, startDate: makeDate(3), endDate: makeDate(5) },
      { stage: ProductionStage.Transplanting, startDate: makeDate(5), endDate: makeDate(6) },
      { stage: ProductionStage.VegetativeGrowth, startDate: makeDate(6), endDate: makeDate(12) },
      { stage: ProductionStage.Flowering, startDate: makeDate(12), endDate: makeDate(16) },
      { stage: ProductionStage.ReadyForRetail, startDate: makeDate(16), endDate: makeDate(18) },
    ],
  },
  {
    id: "3",
    cropName: "Basil & Herbs",
    greenhouse: "Greenhouse C",
    notes: "Mixed herb tray",
    stages: [
      { stage: ProductionStage.Propagation, startDate: makeDate(2), endDate: makeDate(3) },
      { stage: ProductionStage.Germination, startDate: makeDate(3), endDate: makeDate(5) },
      { stage: ProductionStage.VegetativeGrowth, startDate: makeDate(5), endDate: makeDate(9) },
      { stage: ProductionStage.ReadyForRetail, startDate: makeDate(9), endDate: makeDate(11) },
    ],
  },
  {
    id: "4",
    cropName: "Succulents",
    greenhouse: "Greenhouse A",
    notes: "Mixed succulent trays",
    stages: [
      { stage: ProductionStage.Propagation, startDate: makeDate(0), endDate: makeDate(4) },
      { stage: ProductionStage.VegetativeGrowth, startDate: makeDate(4), endDate: makeDate(12) },
      { stage: ProductionStage.HardeningOff, startDate: makeDate(12), endDate: makeDate(14) },
      { stage: ProductionStage.ReadyForRetail, startDate: makeDate(14), endDate: makeDate(18) },
    ],
  },
];

export function useProductionSchedule() {
  const [batches, setBatches] = useState<CropBatch[]>(INITIAL_BATCHES);

  const addBatch = useCallback((batch: Omit<CropBatch, "id">) => {
    setBatches((prev) => [...prev, { ...batch, id: crypto.randomUUID() }]);
  }, []);

  const updateBatch = useCallback((id: string, updates: Partial<Omit<CropBatch, "id">>) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }, []);

  const deleteBatch = useCallback((id: string) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { batches, addBatch, updateBatch, deleteBatch };
}
