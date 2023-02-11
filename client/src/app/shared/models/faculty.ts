export interface IFaculty {
  id: string;
  userPhoto: string;
  email: string;
  displayName: string;
  userRoles: string[];
  createdAt: string;
  areas: string[];
}

export interface IFacultyRoot {
  count: number;
  data: IFaculty[];
}