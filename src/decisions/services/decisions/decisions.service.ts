import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Decision } from 'src/decisions/types/decision';

@Injectable()
export class DecisionsService {
  constructor(private prismaService: PrismaService) {}

  private async checkProjectExistence(project_id: string) {
    const project = await this.prismaService.prisma.projects.findUnique({
      where: {
        id: project_id,
      },
    });
    if (!project) {
      throw new NotFoundException(`this project ${project_id} does not exist `);
    }
  }
  private async checkUserExistence(user_id: string) {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
  }

  async create(decision: Decision) {
    await this.checkUserExistence(decision.userId);
    await this.checkProjectExistence(decision.projectId);
    const createDecision = await this.prismaService.prisma.decisions.create({
      data: {
        ...decision,
      },
    });
    return createDecision;
  }
  async findById(id: string) {
    const decision = await this.prismaService.prisma.decisions.findUnique({
      where: {
        id,
      },
    });
    if (!decision) {
      throw new NotFoundException(`Decision ${id} not found`);
    }
    return decision;
  }
  async delete(id: string) {
    await this.prismaService.prisma.decisions.delete({
      where: {
        id,
      },
    });
  }
  async update(id: string, decision: Decision) {
    await this.checkUserExistence(decision.userId);
    await this.checkProjectExistence(decision.projectId);
    const updateDecision = await this.prismaService.prisma.decisions.update({
      where: {
        id,
      },
      data: {
        ...decision,
      },
    });
    return updateDecision;
  }
}
