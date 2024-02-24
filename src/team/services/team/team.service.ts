import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';
import { TTeam } from 'src/team/types/team';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createTeam(data: TTeam): Promise<Team> {
    await this.userService.checkUserExistence(data.userId);
    const team = await this.prismaService.team.create({
      data,
    });
    return team;
  }

  async findTeamById(team_id: string): Promise<Team | null> {
    const team = await this.prismaService.team.findUnique({
      where: {
        id: team_id,
      },
    });
    if (!team) {
      throw new NotFoundException(RESOURSE_NOT_FOUND);
    }
    return team;
  }

  async findTeamByIdAnDelete(team_id: string): Promise<Team | null> {
    await this.findTeamById(team_id);
    const team = await this.prismaService.team.delete({
      where: {
        id: team_id,
      },
    });
    return team;
  }

  async findTeamByIdAndUpdate(
    team_id: string,
    data: TTeam,
  ): Promise<Team | null> {
    await this.findTeamById(team_id);
    const update = await this.prismaService.team.update({
      where: {
        id: team_id,
      },
      data,
    });
    return update;
  }
}
