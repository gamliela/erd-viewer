export interface DotObject {
  name: string;
}

export interface DotEdge {
  tail: number;
  head: number;
}

export interface DotGraph {
  name: string;
  objects: DotObject[];
  edges: DotEdge[];
}
