import { useEffect, useRef, useCallback, useState } from "react";
import { CallFlowNode } from "@/types/callflow";
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

  // Sort children by sortOrder
  const sortChildren = (tn: TreeNode) => {
    tn.children.sort((a, b) => a.node.sortOrder - b.node.sortOrder);
    tn.children.forEach(sortChildren);
  };
  roots.forEach(sortChildren);

  return roots;
}

function TreeBranch({
  treeNode,
  onSelectNode,
  onAddChild,
  onDeleteNode,
  registerNode,
}: {
  treeNode: TreeNode;
  onSelectNode: (node: CallFlowNode) => void;
  onAddChild: (parentId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  registerNode: (id: string, el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <div ref={(el) => registerNode(treeNode.node.id, el)}>
        <NodeCard
          node={treeNode.node}
          onSelect={onSelectNode}
          onAddChild={onAddChild}
          onDelete={onDeleteNode}
        />
      </div>
      {treeNode.children.length > 0 && (
        <div className="flex gap-8 mt-2 pt-2">
          {treeNode.children.map((child) => (
            <TreeBranch
              key={child.node.id}
              treeNode={child}
              onSelectNode={onSelectNode}
              onAddChild={onAddChild}
              onDeleteNode={onDeleteNode}
              registerNode={registerNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ nodes, onSelectNode, onAddChild, onDeleteNode }: TreeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [, setTick] = useState(0);

  const registerNode = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  }, []);

  useEffect(() => {
    // Force re-render after mount to draw lines
    const timer = setTimeout(() => setTick((t) => t + 1), 100);
    return () => clearTimeout(timer);
  }, [nodes]);

  const tree = buildTree(nodes);

  // Calculate SVG lines
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  if (containerRef.current) {
    const containerRect = containerRef.current.getBoundingClientRect();
    for (const node of nodes) {
      if (node.parentNodeId) {
        const parentEl = nodeRefs.current.get(node.parentNodeId);
        const childEl = nodeRefs.current.get(node.id);
        if (parentEl && childEl) {
          const pRect = parentEl.getBoundingClientRect();
          const cRect = childEl.getBoundingClientRect();
          lines.push({
            x1: pRect.left + pRect.width / 2 - containerRect.left,
            y1: pRect.top + pRect.height - containerRect.top,
            x2: cRect.left + cRect.width / 2 - containerRect.left,
            y2: cRect.top - containerRect.top,
          });
        }
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-full flex justify-center pt-8 pb-16">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B8A9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00B8A9" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {lines.map((line, i) => {
          const midY = (line.y1 + line.y2) / 2;
          return (
            <path
              key={i}
              d={`M ${line.x1} ${line.y1} C ${line.x1} ${midY}, ${line.x2} ${midY}, ${line.x2} ${line.y2}`}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      <div className="relative z-10">
        {tree.map((root) => (
          <TreeBranch
            key={root.node.id}
            treeNode={root}
            onSelectNode={onSelectNode}
            onAddChild={onAddChild}
            onDeleteNode={onDeleteNode}
            registerNode={registerNode}
          />
        ))}
      </div>
    </div>
  );
}
