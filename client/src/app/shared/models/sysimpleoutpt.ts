export interface ISysImpleOutpt {
  id: string;
  systemName: string;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
  parameterId: string;
}


export interface ISysImpleOutptRoot {
  count: number;
  data: ISysImpleOutpt[];
}