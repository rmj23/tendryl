export enum NodeType {
  Menu = 0,
  Forward = 1,
  Hangup = 2,
  Device = 3,
  Voicemail = 4,
  Queue = 5,
}

export interface CallFlowNode {
  id: string;
  parentNodeId: string | null;
  dtmfKey: string | null;
  nodeType: NodeType;
  label: string;
  message: string | null;
  forwardNumber: string | null;
  sortOrder: number;
}

export interface CallFlow {
  id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
  nodes: CallFlowNode[];
}

export interface CallFlowSummary {
  id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
}

export const NodeTypeLabels: Record<NodeType, string> = {
  [NodeType.Menu]: "Menu",
  [NodeType.Forward]: "Forward",
  [NodeType.Hangup]: "Hangup",
  [NodeType.Device]: "Device",
  [NodeType.Voicemail]: "Voicemail",
  [NodeType.Queue]: "Queue",
};

export const ComingSoonNodeTypes = [NodeType.Device, NodeType.Voicemail, NodeType.Queue];
