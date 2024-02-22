import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Decision } from 'src/decisions/types/decision';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { Decisions } from '@prisma/client';

@Injectable()
export class DecisionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
  ) {}

  async create(decision: Decision): Promise<Decisions> {
    await this.userService.checkUserExistence(decision.userId);
    await this.projectService.checkProjectExistence(decision.projectId);
    const createDecision = await this.prismaService.decisions.create({
      data: {
        ...decision,
      },
    });
    return createDecision;
  }

  async findDecisionById(decision_id: string): Promise<Decisions | null> {
    const decision = await this.prismaService.decisions.findUnique({
      where: {
        id: decision_id,
      },
    });
    if (!decision) {
      throw new NotFoundException(`Decision ${decision_id} not found`);
    }
    return decision;
  }

  async findDecisionByIdAndDelete(
    decision_id: string,
  ): Promise<Decisions | null> {
    await this.findDecisionById(decision_id);
    return await this.prismaService.decisions.delete({
      where: {
        id: decision_id,
      },
    });
  }

  async findDecisionByIdAndUpdate(
    decision_id: string,
    decision: Decision,
  ): Promise<Decisions> {
    await this.findDecisionById(decision_id);
    await this.userService.checkUserExistence(decision.userId);
    await this.projectService.checkProjectExistence(decision.projectId);
    const findDecisionByIdAndUpdate = await this.prismaService.decisions.update(
      {
        where: {
          id: decision_id,
        },
        data: {
          ...decision,
        },
      },
    );
    return findDecisionByIdAndUpdate;
  }
}
