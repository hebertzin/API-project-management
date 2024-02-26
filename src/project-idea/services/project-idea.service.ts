import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectIdea } from '../types/projectIdea';
import { UserService } from 'src/user/services/user/user.service';
import { errors } from 'src/helpers/errors';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ProjectIdeaService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  async createProjectIdea(data: ProjectIdea): Promise<ProjectIdea> {
    try {
      await this.userService.checkUserExistence(data.userId);
      const createIdea = await this.prismaService.projectIdea.create({
        data: {
          ...data,
        },
      });

      return createIdea;
    } catch (error) {
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }

  async DeleteProjectIdea(id: string): Promise<ProjectIdea | null> {
    try {
      await this.findProjectIdeaById(id);
      return await this.prismaService.projectIdea.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }
  async findProjectIdeaById(id: string): Promise<ProjectIdea | null> {
    try {
      const projectIdea = await this.prismaService.projectIdea.findUnique({
        where: {
          id,
        },
      });
      if (!projectIdea) {
        throw new NotFoundException();
      }

      return projectIdea;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(errors.projectIdeaDoesNotExist);
      }
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }
  async updateProjectIdea(
    id: string,
    data: ProjectIdea,
  ): Promise<ProjectIdea | null> {
    try {
      await this.findProjectIdeaById(id);
      const update = await this.prismaService.projectIdea.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }
  async findAllProjectIdeas(user_id: string): Promise<ProjectIdea[] | null> {
    try {
      await this.userService.checkUserExistence(user_id);
      const allProjectsIdea = await this.prismaService.projectIdea.findMany({
        where: {
          userId: user_id,
        },
      });

      return allProjectsIdea;
    } catch (error) {
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }
}
