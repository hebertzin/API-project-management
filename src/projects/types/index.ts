export enum Priority {
  MIN = 'min',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type Project = {
  name: string;
  description: string;
  priority: Priority;
  url: string;
  visibility: boolean;
  userId: string;
};
