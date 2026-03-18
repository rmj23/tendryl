export enum ProductionStage {
  Propagation = "propagation",
  Germination = "germination",
  Transplanting = "transplanting",
  VegetativeGrowth = "vegetative_growth",
  HardeningOff = "hardening_off",
  Flowering = "flowering",
  ReadyForRetail = "ready_for_retail",
  Shipped = "shipped",
}

export const STAGE_LABELS: Record<ProductionStage, string> = {
  [ProductionStage.Propagation]: "Propagation",
  [ProductionStage.Germination]: "Germination",
  [ProductionStage.Transplanting]: "Transplanting",
  [ProductionStage.VegetativeGrowth]: "Vegetative Growth",
  [ProductionStage.HardeningOff]: "Hardening Off",
  [ProductionStage.Flowering]: "Flowering / Fruiting",
  [ProductionStage.ReadyForRetail]: "Ready for Retail",
  [ProductionStage.Shipped]: "Shipped",
};

export const STAGE_COLORS: Record<ProductionStage, string> = {
  [ProductionStage.Propagation]: "bg-amber-600",
  [ProductionStage.Germination]: "bg-lime-600",
  [ProductionStage.Transplanting]: "bg-cyan-600",
  [ProductionStage.VegetativeGrowth]: "bg-emerald-600",
  [ProductionStage.HardeningOff]: "bg-orange-500",
  [ProductionStage.Flowering]: "bg-purple-600",
  [ProductionStage.ReadyForRetail]: "bg-primary",
  [ProductionStage.Shipped]: "bg-muted-foreground",
};

export const STAGE_HEX: Record<ProductionStage, string> = {
  [ProductionStage.Propagation]: "#d97706",
  [ProductionStage.Germination]: "#65a30d",
  [ProductionStage.Transplanting]: "#0891b2",
  [ProductionStage.VegetativeGrowth]: "#059669",
  [ProductionStage.HardeningOff]: "#f97316",
  [ProductionStage.Flowering]: "#9333ea",
  [ProductionStage.ReadyForRetail]: "#2d6a4f",
  [ProductionStage.Shipped]: "#6b7280",
};

export const ALL_STAGES = Object.values(ProductionStage);

export interface StageEntry {
  stage: ProductionStage;
  startDate: string; // ISO date string
  endDate: string;
}

export interface CropBatch {
  id: string;
  cropName: string;
  greenhouse: string;
  stages: StageEntry[];
  notes: string;
}

export const GREENHOUSES = [
  "Greenhouse A",
  "Greenhouse B",
  "Greenhouse C",
  "Greenhouse D",
  "Outdoor Beds",
];
