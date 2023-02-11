export interface IArea {
  id: number;
  arNameNo: string;
  arName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
  levelId: number;
  facultyUserId?: any;
}

export interface IAreaRoot {
  count: number;
  data: IArea[];
}
