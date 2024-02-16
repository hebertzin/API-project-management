import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TGoals } from 'src/goals/types/gaols';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { Goals } from '@prisma/client';

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
    const create = await this.prismaService.prisma.goals.create({
      data: {
        ...goal,
      },
    });
    return create;
  }

  async findGoalByIdAndUpdate(goal_id: string, data: TGoals): Promise<Goals> {
    await this.userService.checkUserExistence(data.userId);
    await this.projctsService.checkProjectExistence(data.projectId);
    const update = await this.prismaService.prisma.goals.update({
      where: {
        id: goal_id,
      },
      data: {
        ...data,
      },
    });
    return update;
  }

  async findGoalByIdAndDelete(goal_id: string): Promise<Goals> {
    await this.findGoalById(goal_id);
    return await this.prismaService.prisma.goals.delete({
      where: {
        id: goal_id,
      },
    });
  }

  async findGoalById(goal_id: string): Promise<Goals> {
    const goal = await this.prismaService.prisma.goals.findUnique({
      where: {
        id: goal_id,
      },
    });
    if (!goal) {
      throw new NotFoundException(`this goal ${goal_id} does not exist`);
    }
    return goal;
  }
}
