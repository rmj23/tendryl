import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface NewFlowModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, phoneNumber: string) => void;
}

export function NewFlowModal({ open, onClose, onCreate }: NewFlowModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = () => {
    if (name.trim() && phone.trim()) {
      onCreate(name.trim(), phone.trim());
      setName("");
      setPhone("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[hsl(0,0%,8%)] border-[hsl(0,0%,18%)] max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[hsl(0,0%,90%)] font-display">New Call Flow</DialogTitle>
          <DialogDescription className="text-[hsl(0,0%,50%)]">
            Create a new call flow with a name and phone number.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Main Line"
              className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm focus-visible:ring-[#00B8A9]/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[hsl(0,0%,50%)] uppercase tracking-wider">Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] text-sm font-mono focus-visible:ring-[#00B8A9]/50"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,14%)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || !phone.trim()}
            className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-[#0F0F0F] font-semibold disabled:opacity-40"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
