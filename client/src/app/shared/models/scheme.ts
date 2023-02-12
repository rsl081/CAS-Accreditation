export interface IScheme {
  id: string;
  schemeName: string;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
  sysImpOutptId: string;
}

export interface ISchemeRoot {
  count: number;
  data: IScheme[];
}