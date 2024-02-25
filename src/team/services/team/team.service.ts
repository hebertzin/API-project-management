import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';
import { LoggerService } from 'src/logger/logger.service';
import { TTeam } from 'src/team/types/team';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  async createTeam(data: TTeam): Promise<Team> {
    try {
      await this.userService.checkUserExistence(data.userId);
      const team = await this.prismaService.team.create({
        data,
      });
      return team;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findTeamById(team_id: string): Promise<Team | null> {
    try {
      const team = await this.prismaService.team.findUnique({
        where: {
          id: team_id,
        },
      });
      if (!team) {
        throw new NotFoundException();
      }
      return team;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(RESOURSE_NOT_FOUND);
      }

      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findTeamByIdAnDelete(team_id: string): Promise<Team | null> {
    try {
      await this.findTeamById(team_id);
      return await this.prismaService.team.delete({
        where: {
          id: team_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findTeamByIdAndUpdate(
    team_id: string,
    data: TTeam,
  ): Promise<Team | null> {
    try {
      await this.findTeamById(team_id);
      const update = await this.prismaService.team.update({
        where: {
          id: team_id,
        },
        data,
      });

      return update;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
