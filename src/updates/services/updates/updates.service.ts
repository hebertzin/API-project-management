import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { TUpdate } from 'src/updates/types/updates';
import { UserService } from 'src/user/services/user/user.service';
import { Updates } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { i18n } from 'src/i18n';

@Injectable()
export class UpdatesService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
    private logger: LoggerService,
  ) {}

  async createUpdateToProject(data: TUpdate): Promise<Updates> {
    try {
      await this.userService.checkUserExistence(data.userId);
      await this.projectService.checkProjectExistence(data.projectId);

      const updates = await this.prismaService.updates.create({
        data: {
          ...data,
        },
      });
      return updates;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findUpdateById(update_id: string): Promise<Updates> {
    try {
      const updateFound = await this.prismaService.updates.findUnique({
        where: {
          id: update_id,
        },
      });
      if (!updateFound) {
        throw new NotFoundException();
      }
      return updateFound;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(i18n()['exception.notFound'], update_id);
      }
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async editUpdateProjectbyId(
    update_id: string,
    data: TUpdate,
  ): Promise<Updates> {
    try {
      this.logger.log('verifiy if project and updates exist before update...');
      await this.userService.checkUserExistence(data.userId);
      await this.projectService.checkProjectExistence(data.projectId);
      const update = await this.prismaService.updates.update({
        where: {
          id: update_id,
        },
        data: {
          ...data,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findByIdAndDeleteUpdate(update_id: string): Promise<Updates | null> {
    try {
      await this.findUpdateById(update_id);
      return await this.prismaService.updates.delete({
        where: {
          id: update_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
