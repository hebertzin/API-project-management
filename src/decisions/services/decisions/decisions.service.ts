import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Decision } from 'src/decisions/types/decision';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class DecisionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
  ) {}

  async create(decision: Decision) {
    await this.userService.checkUserExistence(decision.userId);
    await this.projectService.checkProjectExistence(decision.projectId);
    const createDecision = await this.prismaService.prisma.decisions.create({
      data: {
        ...decision,
      },
    });
    return createDecision;
  }

  async findById(decision_id: string) {
    const decision = await this.prismaService.prisma.decisions.findUnique({
      where: {
        id: decision_id,
      },
    });
    if (!decision) {
      throw new NotFoundException(`Decision ${decision_id} not found`);
    }
    return decision;
  }

  async delete(decision_id: string) {
    await this.prismaService.prisma.decisions.delete({
      where: {
        id: decision_id,
      },
    });
  }

  async update(decision_id: string, decision: Decision) {
    await this.userService.checkUserExistence(decision.userId);
    await this.projectService.checkProjectExistence(decision.projectId);
    const updateDecision = await this.prismaService.prisma.decisions.update({
      where: {
        id: decision_id,
      },
      data: {
        ...decision,
      },
    });
    return updateDecision;
  }
}
