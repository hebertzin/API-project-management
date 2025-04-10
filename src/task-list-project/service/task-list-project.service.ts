import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { i18n } from 'src/i18n';
import { LoggerService } from 'src/logger/logger.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { TaskListProject } from 'src/task-list-project/types';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class TaskListProjectService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
    private logger: LoggerService,
  ) {}

  createTaskProject = async (data: TaskListProject) => {
    this.logger.log('make all verifications before create tasklist...');
    await this.userService.checkUserExistence(data.userId);
    await this.projectService.checkProjectExistence(data.projectId);

    const taskList = await this.prismaService.taskListProject.create({
      data: {
        ...data,
      },
    });
    return taskList;
  };

  findTaskById = async (
    task_list_id: string,
  ): Promise<TaskListProject | null> => {
    const taskList = await this.prismaService.taskListProject.findUnique({
      where: {
        id: task_list_id,
      },
    });

    if (!taskList) {
      throw new NotFoundException(i18n()['exception.notFound']);
    }
    return taskList;
  };

  deleteTask = async (task_list_id: string): Promise<void> => {
    await this.findTaskById(task_list_id);
    await this.prismaService.taskListProject.delete({
      where: {
        id: task_list_id,
      },
    });
  };

  updateTask = async (
    task_list_id: string,
    data: TaskListProject,
  ): Promise<TaskListProject | null> => {
    this.logger.log('make all verifications before create tasklist...');
    await this.projectService.checkProjectExistence(data.projectId);
    const taskList = await this.prismaService.taskListProject.update({
      where: {
        id: task_list_id,
      },
      data: {
        ...data,
      },
    });
    return taskList;
  };
}
