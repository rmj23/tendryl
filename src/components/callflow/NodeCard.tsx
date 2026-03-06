import { Mic, PhoneForwarded, Plus, Trash2 } from "lucide-react";
import { CallFlowNode, NodeType } from "@/types/callflow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NodeCardProps {
  node: CallFlowNode;
  onSelect: (node: CallFlowNode) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
}

export function NodeCard({ node, onSelect, onAddChild, onDelete }: NodeCardProps) {
  const isMenu = node.nodeType === NodeType.Menu;
  const isForward = node.nodeType === NodeType.Forward;

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => onSelect(node)}
        className={cn(
          "relative w-72 rounded-xl p-4 cursor-pointer transition-all duration-200",
          "bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)]",
          "hover:border-[#00B8A9]/40 hover:shadow-[0_0_20px_rgba(0,184,169,0.08)]",
          "backdrop-blur-sm group",
          isMenu && "border-l-2 border-l-[#00B8A9]"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center",
            isMenu ? "bg-[#00B8A9]/15 text-[#00B8A9]" : "bg-[hsl(0,0%,18%)] text-[hsl(0,0%,60%)]"
          )}>
            {isMenu ? <Mic className="h-4 w-4" /> : <PhoneForwarded className="h-4 w-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[hsl(0,0%,90%)] truncate">{node.label}</p>
            <p className="text-[10px] uppercase tracking-wider text-[hsl(0,0%,45%)]">
              {isMenu ? "Menu" : "Forward"}
            </p>
          </div>
          {node.dtmfKey && (
            <Badge className="bg-[hsl(0,0%,18%)] text-[hsl(0,0%,70%)] border border-[hsl(0,0%,25%)] text-xs font-mono hover:bg-[hsl(0,0%,18%)]">
              Press {node.dtmfKey}
            </Badge>
          )}
        </div>

        {/* Body */}
        {isMenu && node.message && (
          <p className="text-xs text-[hsl(0,0%,50%)] leading-relaxed line-clamp-2 mb-3">
            "{node.message}"
          </p>
        )}
        {isForward && node.forwardNumber && (
          <p className="text-xs text-[hsl(0,0%,50%)] font-mono mb-3">
            → {node.forwardNumber}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); onAddChild(node.id); }}
            className="h-7 px-2 text-[hsl(0,0%,50%)] hover:text-[#00B8A9] hover:bg-[#00B8A9]/10"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span className="text-[11px]">Add</span>
          </Button>

          {node.parentNodeId !== null && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                  className="h-7 px-2 text-[hsl(0,0%,50%)] hover:text-red-400 hover:bg-red-400/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[hsl(0,0%,90%)]">Delete node?</AlertDialogTitle>
                  <AlertDialogDescription className="text-[hsl(0,0%,50%)]">
                    This will remove "{node.label}" and all its children. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[hsl(0,0%,14%)] border-[hsl(0,0%,22%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,18%)] hover:text-[hsl(0,0%,90%)]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(node.id)}
                    className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
