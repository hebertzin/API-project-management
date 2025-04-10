import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { i18n } from 'src/i18n';
import { TeamDTO } from 'src/team/dto/team.dto';
import { TeamService } from 'src/team/services/team.service';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const team = await this.teamService.findTeamById(id);

    return res.status(200).json({
      message: i18n()['message.team.get'],
      team,
    });
  }

  @Post()
  async create(@Body() team: TeamDTO, @Res() res: Response) {
    const createTeam = await this.teamService.createTeam(team);

    return res.status(201).json({
      message: i18n()['message.team.created'],
      team: createTeam,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.teamService.findTeamByIdAnDelete(id);
    return res.status(200).json({
      message: i18n()['message.team.deleted'],
    });
  }

  @Put('/:id')
  async update(
    @Param() id: string,
    @Body() data: TeamDTO,
    @Res() res: Response,
  ) {
    const updateTeam = await this.teamService.findTeamByIdAndUpdate(id, data);

    return res.status(200).json({
      message: i18n()['message.team.update'],
      updateTeam,
    });
  }
}
