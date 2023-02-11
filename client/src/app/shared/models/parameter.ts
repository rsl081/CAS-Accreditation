export interface IParameter {
  id: number;
  letterName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
  areaId: number;
}

export interface IParameterRoot {
  count: number;
  data: IParameter[];
}
