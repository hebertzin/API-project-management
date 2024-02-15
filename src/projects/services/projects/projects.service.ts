import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Project } from 'src/projects/types';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  private async checkUserExistence(user_id: string) {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
  }

  private async checkProjectExistenec(project_id: string) {
    const project = await this.prismaService.prisma.projects.findUnique({
      where: {
        id: project_id,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project ${project_id} not found`);
    }
  }

  async create(data: Project) {
    await this.checkUserExistence(data.userId);
    const createProject = await this.prismaService.prisma.projects.create({
      data: {
        ...data,
        priority: data.priority as any,
      },
    });
    return createProject;
  }

  async findAllProjectsUser(id: string) {
    await this.checkUserExistence(id);
    const allProjectsUsers = await this.prismaService.prisma.projects.findMany({
      where: {
        userId: id,
      },
    });
    return allProjectsUsers;
  }

  async findById(id: string) {
    await this.checkProjectExistenec(id);
    const projectFound = await this.prismaService.prisma.projects.findUnique({
      where: {
        id,
      },
    });
    return projectFound;
  }

  async deleteProjectById(id: string) {
    await this.checkProjectExistenec(id);
    return await this.prismaService.prisma.projects.delete({
      where: {
        id,
      },
    });
  }

  async updateProjectById(id: string, data: Project) {
    await this.checkProjectExistenec(id);
    await this.checkUserExistence(data.userId);
    const updatedProject = await this.prismaService.prisma.projects.update({
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
