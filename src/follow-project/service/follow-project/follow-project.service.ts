import { Injectable } from '@nestjs/common';
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

  async followProject(data: Data) {
    await this.projectsService.checkProjectExistence(data.projectId);
    await this.userService.checkUserExistence(data.userId);
    return await this.prismaService.followProject.create({
      data: {
        ...data,
      },
    });
  }

  async getProjectsUserFollow(user_id: string): Promise<Data[] | null> {
    await this.userService.checkUserExistence(user_id);
    const allProjectsUserFollow =
      await this.prismaService.followProject.findMany({
        where: {
          userId: user_id,
        },
      });

    return allProjectsUserFollow;
  }
}
