export interface IArea {
  id: string;
  arNameNo: string;
  arName: string;
  name?: any;
  createdAt: string;
  lastModifiedAt: string;
  keywordId: string;
  keyword: string;
  facultyUserId?: any;
}

export interface IAreaRoot {
  count: number;
  data: IArea[];
}
