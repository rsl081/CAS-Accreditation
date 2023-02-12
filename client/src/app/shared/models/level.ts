export interface ILevel {
  id: string;
  levelName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ILevelRoot {
  count: number;
  data: ILevel[];
}
