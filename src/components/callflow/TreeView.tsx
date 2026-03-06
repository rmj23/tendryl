import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { CallFlowNode, NodeType } from "@/types/callflow";
import { NodeCard } from "./NodeCard";

interface TreeViewProps {
  nodes: CallFlowNode[];
  onSelectNode: (node: CallFlowNode) => void;
  onAddChild: (parentId: string) => void;
  onDeleteNode: (nodeId: string) => void;
}

interface TreeNode {
  node: CallFlowNode;
  children: TreeNode[];
}

interface NodePosition {
  x: number;
  y: number;
}

const NODE_WIDTH = 288;
const NODE_HEIGHT = 160;
const H_GAP = 40;
const V_GAP = 80;

function buildTree(nodes: CallFlowNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];
  for (const node of nodes) {
    map.set(node.id, { node, children: [] });
  }
  for (const node of nodes) {
    const treeNode = map.get(node.id)!;
    if (node.parentNodeId === null) {
      roots.push(treeNode);
    } else {
      const parent = map.get(node.parentNodeId);
      if (parent) parent.children.push(treeNode);
    }
  }
  const sortChildren = (tn: TreeNode) => {
    tn.children.sort((a, b) => a.node.sortOrder - b.node.sortOrder);
    tn.children.forEach(sortChildren);
  };
  roots.forEach(sortChildren);
  return roots;
}

// Calculate subtree width
function subtreeWidth(tn: TreeNode): number {
  if (tn.children.length === 0) return NODE_WIDTH;
  const childrenWidth = tn.children.reduce((sum, c) => sum + subtreeWidth(c), 0)
    + (tn.children.length - 1) * H_GAP;
  return Math.max(NODE_WIDTH, childrenWidth);
}

// Layout nodes into positions
function layoutTree(
  roots: TreeNode[],
  dragOffsets: Map<string, { dx: number; dy: number }>
): Map<string, NodePosition> {
  const positions = new Map<string, NodePosition>();

  function layoutNode(tn: TreeNode, cx: number, cy: number) {
    const offset = dragOffsets.get(tn.node.id);
    positions.set(tn.node.id, {
      x: cx + (offset?.dx || 0),
      y: cy + (offset?.dy || 0),
    });

    if (tn.children.length === 0) return;

    const totalW = tn.children.reduce((sum, c) => sum + subtreeWidth(c), 0)
      + (tn.children.length - 1) * H_GAP;
    let startX = cx - totalW / 2;

    for (const child of tn.children) {
      const w = subtreeWidth(child);
      layoutNode(child, startX + w / 2, cy + NODE_HEIGHT + V_GAP);
      startX += w + H_GAP;
    }
  }

  // Layout all roots side by side
  const totalRootW = roots.reduce((sum, r) => sum + subtreeWidth(r), 0) + (roots.length - 1) * H_GAP;
  let startX = -totalRootW / 2;
  for (const root of roots) {
    const w = subtreeWidth(root);
    layoutNode(root, startX + w / 2, 0);
    startX += w + H_GAP;
  }

  return positions;
}

// Line label lookup
function getNodeLabel(nodes: CallFlowNode[], id: string): string {
  const n = nodes.find((n) => n.id === id);
  return n?.label || "";
}

export function TreeView({ nodes, onSelectNode, onAddChild, onDeleteNode }: TreeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffsets, setDragOffsets] = useState<Map<string, { dx: number; dy: number }>>(new Map());
  const dragStart = useRef({ x: 0, y: 0, origDx: 0, origDy: 0 });
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const positions = useMemo(() => layoutTree(tree, dragOffsets), [tree, dragOffsets]);

  // Center view on mount
  useEffect(() => {
    if (containerRef.current && positions.size > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: 60 });
    }
  }, [nodes.length === 0]); // only re-center when going from 0 to having nodes

  // Zoom with scroll wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setZoom((z) => Math.min(2, Math.max(0.3, z * delta)));
  }, []);

  // Pan with middle-click or background drag
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only pan on background (not on nodes)
    if ((e.target as HTMLElement).closest("[data-node-card]")) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isPanning) {
      setPan({
        x: panStart.current.panX + (e.clientX - panStart.current.x),
        y: panStart.current.panY + (e.clientY - panStart.current.y),
      });
    }
    if (draggingNodeId) {
      const dx = dragStart.current.origDx + (e.clientX - dragStart.current.x) / zoom;
      const dy = dragStart.current.origDy + (e.clientY - dragStart.current.y) / zoom;
      setDragOffsets((prev) => {
        const next = new Map(prev);
        next.set(draggingNodeId, { dx, dy });
        return next;
      });
    }
  }, [isPanning, draggingNodeId, zoom]);

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
    setDraggingNodeId(null);
  }, []);

  const startNodeDrag = useCallback((nodeId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setDraggingNodeId(nodeId);
    const existing = dragOffsets.get(nodeId) || { dx: 0, dy: 0 };
    dragStart.current = { x: e.clientX, y: e.clientY, origDx: existing.dx, origDy: existing.dy };
  }, [dragOffsets]);

  // Build connection lines with metadata
  const lines = useMemo(() => {
    const result: {
      x1: number; y1: number; x2: number; y2: number;
      parentLabel: string; childLabel: string; dtmfKey: string | null;
    }[] = [];
    for (const node of nodes) {
      if (node.parentNodeId) {
        const pPos = positions.get(node.parentNodeId);
        const cPos = positions.get(node.id);
        if (pPos && cPos) {
          result.push({
            x1: pPos.x, y1: pPos.y + NODE_HEIGHT,
            x2: cPos.x, y2: cPos.y,
            parentLabel: getNodeLabel(nodes, node.parentNodeId),
            childLabel: node.label,
            dtmfKey: node.dtmfKey,
          });
        }
      }
    }
    return result;
  }, [nodes, positions]);

  // Zoom controls
  const zoomIn = () => setZoom((z) => Math.min(2, z * 1.2));
  const zoomOut = () => setZoom((z) => Math.max(0.3, z / 1.2));
  const resetView = () => {
    setZoom(1);
    setDragOffsets(new Map());
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: 60 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ cursor: isPanning ? "grabbing" : draggingNodeId ? "move" : "grab" }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-[hsl(0,0%,8%)]/90 backdrop-blur-sm border border-[hsl(0,0%,18%)] rounded-lg p-1">
        <button onClick={zoomOut} className="h-7 w-7 flex items-center justify-center text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,15%)] rounded transition-colors text-sm font-mono">−</button>
        <span className="text-[10px] text-[hsl(0,0%,45%)] w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn} className="h-7 w-7 flex items-center justify-center text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,15%)] rounded transition-colors text-sm font-mono">+</button>
        <div className="w-px h-4 bg-[hsl(0,0%,20%)]" />
        <button onClick={resetView} className="h-7 px-2 flex items-center justify-center text-[10px] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,15%)] rounded transition-colors">Reset</button>
      </div>

      {/* Canvas */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {/* SVG lines */}
        <svg
          className="absolute pointer-events-none"
          style={{
            left: -5000,
            top: -5000,
            width: 10000,
            height: 10000,
            overflow: "visible",
            zIndex: 0,
          }}
        >
          <defs>
            <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B8A9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00B8A9" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="line-grad-hover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B8A9" stopOpacity="1" />
              <stop offset="100%" stopColor="#00B8A9" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {lines.map((line, i) => {
            const midY = (line.y1 + line.y2) / 2;
            const path = `M ${line.x1 + 5000} ${line.y1 + 5000} C ${line.x1 + 5000} ${midY + 5000}, ${line.x2 + 5000} ${midY + 5000}, ${line.x2 + 5000} ${line.y2 + 5000}`;
            const isHovered = hoveredLine === i;
            const labelX = (line.x1 + line.x2) / 2 + 5000;
            const labelY = midY + 5000;

            return (
              <g key={i}>
                {/* Wider invisible hit area for hover */}
                <path
                  d={path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(null)}
                />
                {/* Visible line */}
                <path
                  d={path}
                  fill="none"
                  stroke={isHovered ? "url(#line-grad-hover)" : "url(#line-grad)"}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-200"
                />
                {/* Animated dot traveling along the line */}
                <circle r="3" fill="#00B8A9" opacity={isHovered ? 0.9 : 0.4}>
                  <animateMotion dur="3s" repeatCount="indefinite" path={path} />
                </circle>
                {/* Tooltip label on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={labelX - 70}
                      y={labelY - 14}
                      width={140}
                      height={28}
                      rx={6}
                      fill="hsl(0,0%,10%)"
                      stroke="hsl(0,0%,22%)"
                      strokeWidth={1}
                    />
                    <text
                      x={labelX}
                      y={labelY + 4}
                      textAnchor="middle"
                      fill="hsl(0,0%,75%)"
                      fontSize="11"
                      fontFamily="ui-monospace, monospace"
                    >
                      {line.dtmfKey ? `Press ${line.dtmfKey}` : ""} {line.parentLabel} → {line.childLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node cards */}
        {nodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;
          return (
            <div
              key={node.id}
              data-node-card
              className="absolute"
              style={{
                left: pos.x - NODE_WIDTH / 2,
                top: pos.y,
                width: NODE_WIDTH,
                zIndex: draggingNodeId === node.id ? 50 : 10,
                cursor: draggingNodeId === node.id ? "move" : "grab",
              }}
              onPointerDown={(e) => startNodeDrag(node.id, e)}
            >
              <NodeCard
                node={node}
                onSelect={onSelectNode}
                onAddChild={onAddChild}
                onDelete={onDeleteNode}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
