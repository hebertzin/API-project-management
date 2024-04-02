import { Priority } from '@prisma/client';

export type TaskListProject = {
  title: string;
  description: string;
  priority: Priority;
  userId: string;
  projectId: string;
};
