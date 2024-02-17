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
import { Response } from 'express';
import { TeamDTO } from 'src/team/dto/team.dto';
import { TeamService } from 'src/team/services/team/team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const team = await this.teamService.findTeamById(id);

    return res.status(200).json({
      msg: 'team found successfully',
      team,
    });
  }

  @Post()
  async create(@Body() team: TeamDTO, @Res() res: Response) {
    const createTeam = await this.teamService.createTeam(team);

    return res.status(201).json({
      msg: 'team successfully created',
      team: createTeam,
    });
  }

  @Delete()
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.teamService.findTeamByIdAnDelete(id);
    return res.status(200).json({
      msg: 'team deleted successfully',
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
      msg: 'team updated successfully',
      updateTeam,
    });
  }
}
