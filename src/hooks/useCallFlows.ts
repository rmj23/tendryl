import { useState, useCallback } from "react";
import { CallFlow, CallFlowNode, CallFlowSummary, NodeType } from "@/types/callflow";

// Mock data for demo purposes — replace with real API calls
const generateId = () => crypto.randomUUID();

const MOCK_FLOWS: CallFlow[] = [
  {
    id: "cf-1",
    name: "Main Line",
    phoneNumber: "+1 (555) 999-8888",
    isActive: true,
    nodes: [
      {
        id: "node-1",
        parentNodeId: null,
        dtmfKey: null,
        nodeType: NodeType.Menu,
        label: "Main Menu",
        message: "Thank you for calling Tendryl Nurseries. Press 1 for retail sales. Press 2 for administration. Press 3 for wholesale inquiries.",
        forwardNumber: null,
        sortOrder: 0,
      },
      {
        id: "node-2",
        parentNodeId: "node-1",
        dtmfKey: "1",
        nodeType: NodeType.Forward,
        label: "Retail Sales",
        message: null,
        forwardNumber: "+1 (555) 111-2222",
        sortOrder: 0,
      },
      {
        id: "node-3",
        parentNodeId: "node-1",
        dtmfKey: "2",
        nodeType: NodeType.Forward,
        label: "Administration",
        message: null,
        forwardNumber: "+1 (555) 333-4444",
        sortOrder: 1,
      },
      {
        id: "node-4",
        parentNodeId: "node-1",
        dtmfKey: "3",
        nodeType: NodeType.Forward,
        label: "Wholesale",
        message: null,
        forwardNumber: "+1 (555) 555-6666",
        sortOrder: 2,
      },
    ],
  },
  {
    id: "cf-2",
    name: "Support Line",
    phoneNumber: "+1 (555) 777-3333",
    isActive: false,
    nodes: [],
  },
];

export function useCallFlows() {
  const [flows, setFlows] = useState<CallFlow[]>(MOCK_FLOWS);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const selectedFlow = flows.find((f) => f.id === selectedFlowId) || null;

  const flowSummaries: CallFlowSummary[] = flows.map(({ id, name, phoneNumber, isActive }) => ({
    id, name, phoneNumber, isActive,
  }));

  const selectFlow = useCallback((id: string) => {
    setSelectedFlowId(id);
    setHasUnsavedChanges(false);
  }, []);

  const createFlow = useCallback((name: string, phoneNumber: string) => {
    const newFlow: CallFlow = {
      id: generateId(),
      name,
      phoneNumber,
      isActive: false,
      nodes: [],
    };
    setFlows((prev) => [...prev, newFlow]);
    setSelectedFlowId(newFlow.id);
    setHasUnsavedChanges(false);
  }, []);

  const updateFlow = useCallback((id: string, updates: Partial<Pick<CallFlow, "name" | "phoneNumber" | "isActive">>) => {
    setFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    setHasUnsavedChanges(true);
  }, []);

  const addNode = useCallback((flowId: string, parentNodeId: string | null, nodeType: NodeType) => {
    const newNode: CallFlowNode = {
      id: generateId(),
      parentNodeId,
      dtmfKey: parentNodeId ? "" : null,
      nodeType,
      label: nodeType === NodeType.Menu ? "New Menu" : nodeType === NodeType.Forward ? "New Forward" : "New Node",
      message: nodeType === NodeType.Menu ? "Enter your greeting message here." : null,
      forwardNumber: nodeType === NodeType.Forward ? "" : null,
      sortOrder: 0,
    };
    setFlows((prev) =>
      prev.map((f) =>
        f.id === flowId ? { ...f, nodes: [...f.nodes, newNode] } : f
      )
    );
    setHasUnsavedChanges(true);
    return newNode;
  }, []);

  const updateNode = useCallback((flowId: string, nodeId: string, updates: Partial<CallFlowNode>) => {
    setFlows((prev) =>
      prev.map((f) =>
        f.id === flowId
          ? { ...f, nodes: f.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)) }
          : f
      )
    );
    setHasUnsavedChanges(true);
  }, []);

  const deleteNode = useCallback((flowId: string, nodeId: string) => {
    setFlows((prev) =>
      prev.map((f) =>
        f.id === flowId
          ? {
              ...f,
              nodes: f.nodes.filter(
                (n) => n.id !== nodeId && n.parentNodeId !== nodeId
              ),
            }
          : f
      )
    );
    setHasUnsavedChanges(true);
  }, []);

  const saveChanges = useCallback(() => {
    // In production, this would call PUT endpoints
    setHasUnsavedChanges(false);
  }, []);

  const discardChanges = useCallback(() => {
    // In production, this would re-fetch from API
    setHasUnsavedChanges(false);
  }, []);

  return {
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
  };
}
