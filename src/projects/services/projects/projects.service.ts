import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Project } from 'src/projects/types';
import { UserService } from 'src/user/services/user/user.service';
import { Projects } from '@prisma/client';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  async checkProjectExistence(project_id: string): Promise<Projects | null> {
    try {
      const project = await this.prismaService.projects.findUnique({
        where: {
          id: project_id,
        },
      });

      if (!project) {
        throw new NotFoundException();
      }

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(RESOURSE_NOT_FOUND);
      }
      this.logger.error(
        `some error ocurred checking project existence : ${error.message}`,
      );
      throw error;
    }
  }

  async create(data: Project): Promise<Projects> {
    try {
      await this.userService.checkUserExistence(data.userId);
      const createProject = await this.prismaService.projects.create({
        data: {
          ...data,
          priority: data.priority as any,
        },
      });

      return createProject;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findAllProjectsUser(id: string): Promise<Projects[]> {
    try {
      await this.userService.checkUserExistence(id);
      const allProjectsUsers = await this.prismaService.projects.findMany({
        where: {
          userId: id,
        },
      });
      return allProjectsUsers;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<Projects> {
    try {
      await this.checkProjectExistence(id);
      const projectFound = await this.prismaService.projects.findUnique({
        where: {
          id,
        },
      });

      return projectFound;
    } catch (error) {
      this.logger.error(`some error ocurred: ${error.message}`);
      throw error;
    }
  }

  async deleteProjectById(id: string): Promise<Projects> {
    try {
      await this.checkProjectExistence(id);
      return await this.prismaService.projects.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async updateProjectById(id: string, data: Project): Promise<Projects> {
    try {
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
    } catch (error) {
      this.logger.error(`some error ocurred: ${error.message}`);
      throw error;
    }
  }
}
