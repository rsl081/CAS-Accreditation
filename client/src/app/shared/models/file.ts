export interface IFile {
  id: string;
  fileName: string;
  name: string;
  size: string;
  fileRepo?: any;
  schemeId: string;
  createdAt: string;
  lastModifiedAt: string;
  status: boolean;
}

export interface IFileRoot {
  count: number;
  data: IFile[];
}
