import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  constructor(private teamService: TeamService) { }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const team = await this.teamService.findTeamById(id);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.team.get'],
      data: { team },
    });
  }

  @Post()
  async create(
    @Body() teamDTO: TeamDTO,
    @Res() res: Response
  ) {
    const team = await this.teamService.createTeam(teamDTO);
    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.team.created'],
      data: { team },
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    await this.teamService.findTeamByIdAnDelete(id);
    return res.status(HttpStatus.NO_CONTENT)
  }

  @Put(':id')
  async update(
    @Param() id: string,
    @Body() data: TeamDTO,
    @Res() res: Response,
  ) {
    const team = await this.teamService.findTeamByIdAndUpdate(id, data);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.team.update'],
      data: { team},
    });
  }
}
