import { ILinkMetadata } from "./link";
import { INodeMetadata } from "./node";

export interface IGame {
  id: number;
  title: string;
  description: string;
}


interface IVisualization {
  transitions: ILinkMetadata[],
  locations: INodeMetadata[]
}

export interface IExtendedGame extends IGame {
  visualization: IVisualization;
}
