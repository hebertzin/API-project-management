import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Data } from 'src/follow-project/types/follow';
import { Errors } from 'src/helpers/errors';
import { LoggerService } from 'src/logger/logger.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class FollowProjectService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectsService: ProjectsService,
    private logger: LoggerService,
  ) {}

  private async checkUserAlreadyFollowProject(
    userId: string,
    projectId: string,
  ) {
    try {
      const userAlreadyFollowProject =
        await this.prismaService.projectsFollowers.findFirst({
          where: {
            userId,
            projectId,
          },
        });

      if (userAlreadyFollowProject) {
        throw new ConflictException();
      }

      return userAlreadyFollowProject;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          Errors.RESOURCE_ALREADY_EXISTS,
          `${userId} - ${projectId}`,
        );
      }
      this.logger.error(`some error ocurred : ${error}`);
      throw error;
    }
  }

  async followProject(projectId: string, userId: string) {
    try {
      await this.checkUserAlreadyFollowProject(userId, projectId);
      await this.projectsService.checkProjectExistence(projectId);
      await this.userService.checkUserExistence(userId);
      return await this.prismaService.projectsFollowers.create({
        data: {
          projectId,
          userId,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async getProjectsUserFollow(projectId: string): Promise<object | null> {
    try {
      await this.projectsService.checkProjectExistence(projectId);
      const allProjectsUserFollow =
        await this.prismaService.projectsFollowers.findMany({
          where: {
            projectId: projectId,
          },
        });

      return {
        total: allProjectsUserFollow.length,
        allProjectsUserFollow,
      };
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async stopFollowProject(id: string): Promise<Data | null> {
    try {
      return await this.prismaService.projectsFollowers.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
