
export interface IKeyword {
  id: string;
  keywordName: string;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
  levelId: string;
}

export interface IKeywordRoot {
  count: number;
  data: IKeyword[];
}

