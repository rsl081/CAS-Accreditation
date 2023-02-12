export interface IParameter {
  id: string;
  paramName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
  areaId: string;
}

export interface IParameterRoot {
  count: number;
  data: IParameter[];
}
