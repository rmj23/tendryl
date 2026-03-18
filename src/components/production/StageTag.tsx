import { ProductionStage, STAGE_LABELS, STAGE_HEX } from "@/types/production";

interface StageTagProps {
  stage: ProductionStage;
  compact?: boolean;
}

export function StageTag({ stage, compact }: StageTagProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${STAGE_HEX[stage]}20`, color: STAGE_HEX[stage] }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: STAGE_HEX[stage] }}
      />
      {!compact && STAGE_LABELS[stage]}
    </span>
  );
}
