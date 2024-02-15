import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { Update } from 'src/updates/types/updates';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class UpdatesService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
  ) {}

  async create(data: Update) {
    await this.userService.checkUserExistence(data.userId);
    await this.projectService.checkProjectExistence(data.projectId);

    const updates = await this.prismaService.prisma.updates.create({
      data: {
        ...data,
      },
    });
    return updates;
  }
}
