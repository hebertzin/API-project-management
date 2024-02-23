export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type Project = {
  name: string;
  description: string;
  priority: Priority;
  url: string;
  visibility: boolean;
  userId: string;
};
