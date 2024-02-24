import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectIdea } from '../types/projectIdea';
import { UserService } from 'src/user/services/user/user.service';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';

@Injectable()
export class ProjectIdeaService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createProjectIdea(data: ProjectIdea): Promise<ProjectIdea> {
    await this.userService.checkUserExistence(data.userId);
    const createIdea = await this.prismaService.projectIdea.create({
      data: {
        ...data,
      },
    });

    return createIdea;
  }

  async DeleteProjectIdea(id: string): Promise<ProjectIdea | null> {
    await this.findProjectIdeaById(id);
    return await this.prismaService.projectIdea.delete({
      where: {
        id,
      },
    });
  }
  async findProjectIdeaById(id: string): Promise<ProjectIdea | null> {
    const projectIdea = await this.prismaService.projectIdea.findUnique({
      where: {
        id,
      },
    });
    if (!projectIdea) {
      throw new NotFoundException(RESOURSE_NOT_FOUND);
    }

    return projectIdea;
  }
  async updateProjectIdea(
    id: string,
    data: ProjectIdea,
  ): Promise<ProjectIdea | null> {
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
  }
  async findAllProjectIdeas(user_id: string): Promise<ProjectIdea[] | null> {
    await this.userService.checkUserExistence(user_id);
    const allProjectsIdea = await this.prismaService.projectIdea.findMany({
      where: {
        userId: user_id,
      },
    });

    return allProjectsIdea;
  }
}
