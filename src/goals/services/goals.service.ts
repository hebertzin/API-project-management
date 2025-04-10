import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TGoals } from 'src/goals/types/goals';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user.service';
import { Goals } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { i18n } from 'src/i18n';

@Injectable()
export class GoalsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projctsService: ProjectsService,
    private logger: LoggerService,
  ) {}

  async createGoal(goal: TGoals): Promise<Goals> {
    try {
      await this.userService.checkUserExistence(goal.userId);
      await this.projctsService.checkProjectExistence(goal.projectId);
      const create = await this.prismaService.goals.create({
        data: {
          ...goal,
        },
      });
      return create;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findGoalByIdAndUpdate(
    goal_id: string,
    data: TGoals,
  ): Promise<Goals | null> {
    try {
      await this.userService.checkUserExistence(data.userId);
      await this.projctsService.checkProjectExistence(data.projectId);
      const updateGoal = await this.prismaService.goals.update({
        where: {
          id: goal_id,
        },
        data: {
          ...data,
        },
      });
      return updateGoal;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findGoalByIdAndDelete(goal_id: string): Promise<Goals> {
    try {
      await this.findGoalById(goal_id);
      return await this.prismaService.goals.delete({
        where: {
          id: goal_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findGoalById(goal_id: string): Promise<Goals | null> {
    try {
      const goal = await this.prismaService.goals.findUnique({
        where: {
          id: goal_id,
        },
      });
      if (!goal) {
        throw new NotFoundException();
      }
      return goal;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(i18n()['exception.notFound'], goal_id);
      }
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
