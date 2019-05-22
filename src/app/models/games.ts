import { ILinkMetadata } from "./link";
import { INodeMetadata } from "./node";

export interface IGame {
  id: number;
  title: string;
  description: string;
  initial_state: object;
}


interface IVisualization {
  transitions: ILinkMetadata[],
  locations: INodeMetadata[]
}

export interface IExtendedGame extends IGame {
  visualization: IVisualization;
}
