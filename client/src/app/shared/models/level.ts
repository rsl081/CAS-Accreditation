export interface ILevel {
  id: number;
  levelName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ILevelRoot {
  count: number;
  data: ILevel[];
}
