interface IStateValue {
  statement: string;
  description: string;
  value: any;
  deleted?: boolean;
}

export interface IStateChanges {
  field: string;
  data: IStateValue;
}
