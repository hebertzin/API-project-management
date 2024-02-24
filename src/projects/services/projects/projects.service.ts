import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Project } from 'src/projects/types';
import { UserService } from 'src/user/services/user/user.service';
import { Projects } from '@prisma/client';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async checkProjectExistence(project_id: string): Promise<Projects | null> {
    const project = await this.prismaService.projects.findUnique({
      where: {
        id: project_id,
      },
    });
    if (!project) {
      throw new NotFoundException(RESOURSE_NOT_FOUND);
    }
    return project;
  }

  async create(data: Project): Promise<Projects> {
    await this.userService.checkUserExistence(data.userId);
    const createProject = await this.prismaService.projects.create({
      data: {
        ...data,
        priority: data.priority as any,
      },
    });
    return createProject;
  }

  async findAllProjectsUser(id: string): Promise<Projects[]> {
    await this.userService.checkUserExistence(id);
    const allProjectsUsers = await this.prismaService.projects.findMany({
      where: {
        userId: id,
      },
    });
    return allProjectsUsers;
  }

  async findById(id: string): Promise<Projects> {
    await this.checkProjectExistence(id);
    const projectFound = await this.prismaService.projects.findUnique({
      where: {
        id,
      },
    });
    return projectFound;
  }

  async deleteProjectById(id: string): Promise<Projects> {
    await this.checkProjectExistence(id);
    return await this.prismaService.projects.delete({
      where: {
        id,
      },
    });
  }

  async updateProjectById(id: string, data: Project): Promise<Projects> {
    await this.checkProjectExistence(id);
    await this.userService.checkUserExistence(data.userId);
    const updatedProject = await this.prismaService.projects.update({
      where: {
        id,
      },
      data: {
        ...data,
        priority: data.priority as any,
      },
    });
    return updatedProject;
  }
}
