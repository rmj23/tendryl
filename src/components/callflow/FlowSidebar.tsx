import { Plus, Phone } from "lucide-react";
import { CallFlowSummary } from "@/types/callflow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FlowSidebarProps {
  flows: CallFlowSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewFlow: () => void;
}

export function FlowSidebar({ flows, selectedId, onSelect, onNewFlow }: FlowSidebarProps) {
  return (
    <div className="w-72 shrink-0 border-r border-[hsl(0,0%,18%)] bg-[hsl(0,0%,7%)] flex flex-col h-full">
      <div className="p-4 border-b border-[hsl(0,0%,18%)]">
        <Button
          onClick={onNewFlow}
          className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-[#0F0F0F] font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Call Flow
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {flows.length === 0 && (
          <div className="text-center py-8 px-4">
            <Phone className="h-8 w-8 mx-auto mb-3 text-[hsl(0,0%,40%)]" />
            <p className="text-sm text-[hsl(0,0%,50%)]">No call flows yet</p>
            <p className="text-xs text-[hsl(0,0%,35%)] mt-1">Create your first call flow to get started</p>
          </div>
        )}
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => onSelect(flow.id)}
            className={cn(
              "w-full text-left rounded-lg p-3 transition-all duration-150",
              selectedId === flow.id
                ? "bg-[hsl(0,0%,14%)] border border-[#00B8A9]/30"
                : "hover:bg-[hsl(0,0%,11%)] border border-transparent"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-[hsl(0,0%,90%)] truncate">{flow.name}</span>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0 h-5 border",
                  flow.isActive
                    ? "border-[#00B8A9]/40 text-[#00B8A9] bg-[#00B8A9]/10"
                    : "border-[hsl(0,0%,25%)] text-[hsl(0,0%,45%)] bg-transparent"
                )}
              >
                {flow.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <span className="text-xs text-[hsl(0,0%,45%)] font-mono">{flow.phoneNumber}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
