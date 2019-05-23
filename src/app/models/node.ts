export enum TransitionType {
  DEFAULT,
  START,
  FINISH
}

export interface INodeMetadata {
  id: number;
  name: string;
  description: string;
  type: TransitionType;
  meta: object;
  deleted?: boolean;
}

export class D3Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: number;
  title: string;
  metadata: INodeMetadata;

  constructor(id, title, metadata) {
    this.id = id;
    this.title = title;
    this.metadata = metadata;
  }
}
