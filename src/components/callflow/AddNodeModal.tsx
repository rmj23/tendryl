import { Mic, PhoneForwarded, Smartphone, Voicemail, Users, PhoneOff } from "lucide-react";
import { NodeType, ComingSoonNodeTypes, NodeTypeLabels } from "@/types/callflow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AddNodeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: NodeType) => void;
}

const nodeOptions = [
  { type: NodeType.Menu, icon: Mic, description: "IVR menu with greeting and DTMF options" },
  { type: NodeType.Forward, icon: PhoneForwarded, description: "Forward call to another number" },
  { type: NodeType.Hangup, icon: PhoneOff, description: "End the call" },
  { type: NodeType.Device, icon: Smartphone, description: "Ring a connected device" },
  { type: NodeType.Voicemail, icon: Voicemail, description: "Send caller to voicemail" },
  { type: NodeType.Queue, icon: Users, description: "Place caller in a queue" },
];

export function AddNodeModal({ open, onClose, onSelect }: AddNodeModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[hsl(0,0%,8%)] border-[hsl(0,0%,18%)] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[hsl(0,0%,90%)] font-display">Add Node</DialogTitle>
          <DialogDescription className="text-[hsl(0,0%,50%)]">
            Choose a node type to add to your call flow.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {nodeOptions.map(({ type, icon: Icon, description }) => {
            const isComingSoon = ComingSoonNodeTypes.includes(type);
            return (
              <button
                key={type}
                disabled={isComingSoon}
                onClick={() => { onSelect(type); onClose(); }}
                className={cn(
                  "flex flex-col items-start p-3 rounded-lg border text-left transition-all duration-150",
                  isComingSoon
                    ? "border-[hsl(0,0%,14%)] bg-[hsl(0,0%,8%)] opacity-40 cursor-not-allowed"
                    : "border-[hsl(0,0%,18%)] bg-[hsl(0,0%,10%)] hover:border-[#00B8A9]/40 hover:bg-[hsl(0,0%,12%)] cursor-pointer"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="h-4 w-4 text-[hsl(0,0%,55%)]" />
                  <span className="text-sm font-medium text-[hsl(0,0%,85%)]">
                    {NodeTypeLabels[type]}
                  </span>
                </div>
                <span className="text-[11px] text-[hsl(0,0%,45%)] leading-snug">
                  {isComingSoon ? "Coming soon" : description}
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
