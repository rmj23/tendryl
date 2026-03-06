import { useState } from "react";
import { Phone, ArrowLeft, PhoneOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useCallFlows } from "@/hooks/useCallFlows";
import { CallFlowNode, NodeType } from "@/types/callflow";
import { FlowSidebar } from "@/components/callflow/FlowSidebar";
import { TreeView } from "@/components/callflow/TreeView";
import { NodeEditPanel } from "@/components/callflow/NodeEditPanel";
import { AddNodeModal } from "@/components/callflow/AddNodeModal";
import { NewFlowModal } from "@/components/callflow/NewFlowModal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function CallFlowBuilder() {
  const {
    flowSummaries,
    selectedFlow,
    selectedFlowId,
    hasUnsavedChanges,
    selectFlow,
    createFlow,
    updateFlow,
    addNode,
    updateNode,
    deleteNode,
    saveChanges,
    discardChanges,
  } = useCallFlows();

  const [editingNode, setEditingNode] = useState<CallFlowNode | null>(null);
  const [addNodeParentId, setAddNodeParentId] = useState<string | null>(null);
  const [showNewFlowModal, setShowNewFlowModal] = useState(false);

  const handleAddChild = (parentId: string) => {
    setAddNodeParentId(parentId);
  };

  const handleNodeTypeSelect = (type: NodeType) => {
    if (selectedFlowId && addNodeParentId !== null) {
      const newNode = addNode(selectedFlowId, addNodeParentId, type);
      setEditingNode(newNode);
    }
    setAddNodeParentId(null);
  };

  const handleUpdateNode = (updates: Partial<CallFlowNode>) => {
    if (selectedFlowId && editingNode) {
      updateNode(selectedFlowId, editingNode.id, updates);
      setEditingNode((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (selectedFlowId) {
      deleteNode(selectedFlowId, nodeId);
      if (editingNode?.id === nodeId) setEditingNode(null);
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: "#0F0F0F", color: "hsl(0,0%,90%)" }}>
      {/* Unsaved changes banner */}
      {hasUnsavedChanges && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#00B8A9]/10 border-b border-[#00B8A9]/20">
          <span className="text-xs text-[#00B8A9]">You have unsaved changes</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={discardChanges}
              className="h-7 text-xs text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,14%)]"
            >
              Discard
            </Button>
            <Button
              size="sm"
              onClick={saveChanges}
              className="h-7 text-xs bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-[#0F0F0F] font-semibold"
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[hsl(0,0%,14%)]">
        <Link to="/" className="text-[hsl(0,0%,45%)] hover:text-[hsl(0,0%,70%)] transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Phone className="h-4 w-4 text-[#00B8A9]" />
        <span className="text-sm font-semibold font-display tracking-tight">Call Flow Builder</span>
        <span className="text-xs text-[hsl(0,0%,35%)]">by Tendryl</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <FlowSidebar
          flows={flowSummaries}
          selectedId={selectedFlowId}
          onSelect={selectFlow}
          onNewFlow={() => setShowNewFlowModal(true)}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFlow ? (
            <>
              {/* Flow header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-[hsl(0,0%,14%)]">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-semibold font-display text-[hsl(0,0%,92%)]">
                    {selectedFlow.name}
                  </h2>
                  <span className="text-xs text-[hsl(0,0%,40%)] font-mono">
                    {selectedFlow.phoneNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      selectedFlow.isActive
                        ? "border-[#00B8A9]/40 text-[#00B8A9] bg-[#00B8A9]/10 text-xs"
                        : "border-[hsl(0,0%,25%)] text-[hsl(0,0%,45%)] text-xs"
                    }
                  >
                    {selectedFlow.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Switch
                    checked={selectedFlow.isActive}
                    onCheckedChange={(checked) =>
                      updateFlow(selectedFlow.id, { isActive: checked })
                    }
                    className="data-[state=checked]:bg-[#00B8A9]"
                  />
                </div>
              </div>

              {/* Tree */}
              <div className="flex-1 overflow-auto">
                {selectedFlow.nodes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-8">
                    <div className="h-16 w-16 rounded-2xl bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] flex items-center justify-center mb-4">
                      <PhoneOff className="h-7 w-7 text-[hsl(0,0%,30%)]" />
                    </div>
                    <h3 className="text-base font-semibold text-[hsl(0,0%,75%)] font-display mb-1">
                      No nodes yet
                    </h3>
                    <p className="text-sm text-[hsl(0,0%,40%)] max-w-xs mb-4">
                      Start by adding a Menu node as the root of your call flow. This will be the
                      first thing callers hear.
                    </p>
                    <Button
                      onClick={() => setAddNodeParentId("")}
                      className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-[#0F0F0F] font-semibold"
                    >
                      Add Root Node
                    </Button>
                  </div>
                ) : (
                  <TreeView
                    nodes={selectedFlow.nodes}
                    onSelectNode={setEditingNode}
                    onAddChild={handleAddChild}
                    onDeleteNode={handleDeleteNode}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="h-16 w-16 rounded-2xl bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] flex items-center justify-center mb-4">
                <Phone className="h-7 w-7 text-[hsl(0,0%,25%)]" />
              </div>
              <h3 className="text-base font-semibold text-[hsl(0,0%,75%)] font-display mb-1">
                Select a Call Flow
              </h3>
              <p className="text-sm text-[hsl(0,0%,40%)] max-w-xs">
                Choose a call flow from the sidebar to view and edit its node tree, or create a new
                one to get started.
              </p>
            </div>
          )}
        </div>

        {/* Edit panel */}
        {editingNode && (
          <NodeEditPanel
            node={editingNode}
            onUpdate={handleUpdateNode}
            onClose={() => setEditingNode(null)}
          />
        )}
      </div>

      {/* Modals */}
      <AddNodeModal
        open={addNodeParentId !== null}
        onClose={() => setAddNodeParentId(null)}
        onSelect={handleNodeTypeSelect}
      />
      <NewFlowModal
        open={showNewFlowModal}
        onClose={() => setShowNewFlowModal(false)}
        onCreate={createFlow}
      />
    </div>
  );
}
