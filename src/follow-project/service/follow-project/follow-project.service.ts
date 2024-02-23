import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Data } from 'src/follow-project/types/follow';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class FollowProjectService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectsService: ProjectsService,
  ) {}

  private async checkAlreadyFollow(userId: string, projectId: string) {
    const user = await this.prismaService.projectsFollowers.findFirst({
      where: {
        userId,
        projectId,
      },
    });

    if (user) {
      throw new NotFoundException('you already follow this project');
    }

    return user;
  }
  async followProject(projectId: string, userId: string) {
    await this.checkAlreadyFollow(userId, projectId);
    await this.projectsService.checkProjectExistence(projectId);
    await this.userService.checkUserExistence(userId);
    return await this.prismaService.projectsFollowers.create({
      data: {
        projectId,
        userId,
      },
    });
  }

  async getProjectsUserFollow(projectId: string): Promise<object | null> {
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
  }

  async stopFollowProject(id: string): Promise<Data | null> {
    return await this.prismaService.projectsFollowers.delete({
      where: {
        id,
      },
    });
  }
}
