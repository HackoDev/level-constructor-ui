import { D3Node } from './';

export interface ILinkMetadata {
  id: any;
  label: string;
  game: number;

  source: number;
  target: number;

  condition: string;
  condition_rules: object;

  state: object;
  state_rules: object;

  position: number;
  weight: number;
  is_visible: boolean;
  meta: any;

  // local usage
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
