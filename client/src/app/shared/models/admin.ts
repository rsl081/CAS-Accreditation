export interface IAdmin {
  id: string;
  userPhoto: string;
  email: string;
  displayName: string;
  userRoles: string[];
  createdAt: string;
}

export interface IAdminRoot {
  count: number;
  data: IAdmin[];
}