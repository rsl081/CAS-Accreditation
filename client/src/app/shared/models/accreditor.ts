export interface IAccreditor {
  id: string;
  userPhoto: string;
  email: string;
  displayName: string;
  userRoles: string[];
  createdAt: string;
}

export interface IAccreditorRoot {
  count: number;
  data: IAccreditor[];
}
