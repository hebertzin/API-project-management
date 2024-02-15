import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Project } from 'src/projects/types';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async checkProjectExistence(project_id: string) {
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
    await this.userService.checkUserExistence(data.userId);
    const createProject = await this.prismaService.prisma.projects.create({
      data: {
        ...data,
        priority: data.priority as any,
      },
    });
    return createProject;
  }

  async findAllProjectsUser(id: string) {
    await this.userService.checkUserExistence(id);
    const allProjectsUsers = await this.prismaService.prisma.projects.findMany({
      where: {
        userId: id,
      },
    });
    return allProjectsUsers;
  }

  async findById(id: string) {
    await this.checkProjectExistence(id);
    const projectFound = await this.prismaService.prisma.projects.findUnique({
      where: {
        id,
      },
    });
    return projectFound;
  }

  async deleteProjectById(id: string) {
    await this.checkProjectExistence(id);
    return await this.prismaService.prisma.projects.delete({
      where: {
        id,
      },
    });
  }

  async updateProjectById(id: string, data: Project) {
    await this.checkProjectExistence(id);
    await this.userService.checkUserExistence(data.userId);
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
