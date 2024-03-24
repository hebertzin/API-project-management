import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Decision } from 'src/decisions/types/decision';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { Decisions } from '@prisma/client';
import { Errors } from 'src/helpers/errors';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class DecisionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
    private logger: LoggerService,
  ) {}

  async create(decision: Decision): Promise<Decisions> {
    try {
      await this.userService.checkUserExistence(decision.userId);
      await this.projectService.checkProjectExistence(decision.projectId);
      const createDecision = await this.prismaService.decisions.create({
        data: {
          ...decision,
        },
      });
      return createDecision;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findDecisionById(decision_id: string): Promise<Decisions | null> {
    try {
      const decision = await this.prismaService.decisions.findUnique({
        where: {
          id: decision_id,
        },
      });
      if (!decision) {
        throw new NotFoundException();
      }
      return decision;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(Errors.RESOURCE_NOT_FOUND, decision_id);
      }
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findDecisionByIdAndDelete(
    decision_id: string,
  ): Promise<Decisions | null> {
    try {
      await this.findDecisionById(decision_id);
      return await this.prismaService.decisions.delete({
        where: {
          id: decision_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findDecisionByIdAndUpdate(
    decision_id: string,
    decision: Decision,
  ): Promise<Decisions> {
    try {
      await this.findDecisionById(decision_id);
      await this.userService.checkUserExistence(decision.userId);
      await this.projectService.checkProjectExistence(decision.projectId);
      const findDecisionByIdAndUpdate =
        await this.prismaService.decisions.update({
          where: {
            id: decision_id,
          },
          data: {
            ...decision,
          },
        });
      return findDecisionByIdAndUpdate;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
