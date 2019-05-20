import { D3Node } from './';

export interface ILinkMetadata {
  id: number;
  source: number;
  target: number;
  condition: any;
  game: number;
  state: any;
  position: number;
  weight: number;
  is_visible: boolean;
  meta: any;
  deleted?: boolean;
}

export class D3Link implements d3.SimulationLinkDatum<D3Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: D3Node;
  target: D3Node;
  metadata: ILinkMetadata;

  constructor(source, target, metadata) {
    this.source = source;
    this.target = target;
    this.metadata = metadata;
  }
}
