import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Project } from 'src/projects/types';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}
  async create(data: Project) {
    const createProject = await this.prismaService.prisma.projects.create({
      data: {
        ...data,
        priority: data.priority as any,
      },
    });
    return createProject;
  }

  async findAllProjectsUser(id: string) {
    const allProjectsUsers = await this.prismaService.prisma.projects.findMany({
      where: {
        userId: id,
      },
    });
    return allProjectsUsers;
  }

  async findById(id: string) {
    const projectFound = await this.prismaService.prisma.projects.findUnique({
      where: {
        id,
      },
    });
    return projectFound;
  }

  async deleteProjectById(id: string) {
    return await this.prismaService.prisma.projects.delete({
      where: {
        id,
      },
    });
  }

  async updateProjectById(id: string, data: Project) {
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
