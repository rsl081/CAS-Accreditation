export interface IFile {
  id: string;
  fileName: string;
  name: string;
  size: string;
  fileRepo?: any;
  parameterId: number;
  createdAt: string;
  lastModifiedAt: string;
  status: string;
}

export interface IFileRoot {
  count: number;
  data: IFile[];
}
