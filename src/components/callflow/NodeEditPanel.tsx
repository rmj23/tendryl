import { X } from "lucide-react";
import { CallFlowNode, NodeType } from "@/types/callflow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NodeEditPanelProps {
  node: CallFlowNode;
  onUpdate: (updates: Partial<CallFlowNode>) => void;
  onClose: () => void;
}

export function NodeEditPanel({ node, onUpdate, onClose }: NodeEditPanelProps) {
  const isMenu = node.nodeType === NodeType.Menu;
  const isForward = node.nodeType === NodeType.Forward;

  return (
    <div className="w-80 shrink-0 border-l border-[hsl(0,0%,18%)] bg-[hsl(0,0%,7%)] flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-[hsl(0,0%,18%)]">
        <h3 className="text-sm font-semibold text-[hsl(0,0%,90%)] font-display">Edit Node</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,14%)]"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-2">
          <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">Label</Label>
          <Input
            value={node.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm focus-visible:ring-[#00B8A9]/50"
          />
        </div>

        {node.parentNodeId !== null && (
          <div className="space-y-2">
            <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">DTMF Key</Label>
            <Input
              value={node.dtmfKey || ""}
              onChange={(e) => onUpdate({ dtmfKey: e.target.value })}
              placeholder="e.g. 1, 2, 3..."
              maxLength={1}
              className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm font-mono focus-visible:ring-[#00B8A9]/50"
            />
          </div>
        )}

        {isMenu && (
          <div className="space-y-2">
            <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">Greeting Message</Label>
            <Textarea
              value={node.message || ""}
              onChange={(e) => onUpdate({ message: e.target.value })}
              placeholder="Enter the greeting callers will hear..."
              rows={4}
              className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm resize-none focus-visible:ring-[#00B8A9]/50"
            />
          </div>
        )}

        {isForward && (
          <div className="space-y-2">
            <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">Forward Number</Label>
            <Input
              value={node.forwardNumber || ""}
              onChange={(e) => onUpdate({ forwardNumber: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm font-mono focus-visible:ring-[#00B8A9]/50"
            />
          </div>
        )}

        <div className="pt-4 border-t border-[hsl(0,0%,15%)]">
          <div className="text-[10px] text-[hsl(0,0%,35%)] uppercase tracking-wider mb-2">Node Type</div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[hsl(0,0%,12%)] border border-[hsl(0,0%,18%)]">
            <span className="text-xs text-[hsl(0,0%,60%)]">
              {isMenu ? "Menu" : isForward ? "Forward" : "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
