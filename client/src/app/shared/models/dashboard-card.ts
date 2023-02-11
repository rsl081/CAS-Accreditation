export interface IDashboardCard {
  id: number;
  type: string;
  cred?: string,
  cardLabel: string; 
  name: string;
  lastModifiedAt: string;
  btnLabel: string;
}
