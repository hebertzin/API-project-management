import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TGoals } from 'src/goals/types/gaols';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { Goals } from '@prisma/client';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';

@Injectable()
export class GoalsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projctsService: ProjectsService,
  ) {}

  async createGoal(goal: TGoals): Promise<Goals> {
    await this.userService.checkUserExistence(goal.userId);
    await this.projctsService.checkProjectExistence(goal.projectId);
    const create = await this.prismaService.goals.create({
      data: {
        ...goal,
      },
    });
    return create;
  }

  async findGoalByIdAndUpdate(
    goal_id: string,
    data: TGoals,
  ): Promise<Goals | null> {
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
  }

  async findGoalByIdAndDelete(goal_id: string): Promise<Goals> {
    await this.findGoalById(goal_id);
    return await this.prismaService.goals.delete({
      where: {
        id: goal_id,
      },
    });
  }

  async findGoalById(goal_id: string): Promise<Goals | null> {
    const goal = await this.prismaService.goals.findUnique({
      where: {
        id: goal_id,
      },
    });
    if (!goal) {
      throw new NotFoundException(RESOURSE_NOT_FOUND);
    }
    return goal;
  }
}
