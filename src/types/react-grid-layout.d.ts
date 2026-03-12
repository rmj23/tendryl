declare module 'react-grid-layout' {
  import * as React from 'react';
  
  export interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    static?: boolean;
  }

  export type Layout = LayoutItem[];

  export interface ResponsiveProps {
    className?: string;
    layouts?: { [key: string]: Layout };
    breakpoints?: { [key: string]: number };
    cols?: { [key: string]: number };
    rowHeight?: number;
    onLayoutChange?: (layout: Layout, layouts: { [key: string]: Layout }) => void;
    draggableHandle?: string;
    isResizable?: boolean;
    isDraggable?: boolean;
    children?: React.ReactNode;
  }

  export class Responsive extends React.Component<ResponsiveProps> {}
  
  export function WidthProvider<P>(component: React.ComponentType<P>): React.ComponentType<P>;
}

declare module 'react-grid-layout/css/styles.css' {}
declare module 'react-resizable/css/styles.css' {}
