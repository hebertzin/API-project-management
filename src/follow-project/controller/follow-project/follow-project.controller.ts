import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FollowProjectService } from 'src/follow-project/service/follow-project/follow-project.service';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { i18n } from 'src/i18n';

@ApiTags('Follow-project')
@Controller('follow-project')
export class FollowProjectController {
  constructor(private followProjectService: FollowProjectService) {}

  @ApiResponse({
    status: 200,
    description: i18n()['message.followProject.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('/:projectId/follow')
  async followProject(
    @Body() data: any,
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ) {
    const follow = await this.followProjectService.followProject(
      projectId,
      data.userId,
    );

    return res.status(200).json({
      msg: i18n()['message.followProject.created'],
      follow,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.followProject.all'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:projectId/all-followers')
  async allFollowers(
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ) {
    const all =
      await this.followProjectService.getProjectsUserFollow(projectId);
    return res.status(200).json({
      msg: i18n()['message.followProject.all'],
      all,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.followProject.deleted'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id/stop')
  async stopFollowProject(@Res() res: Response, @Param('id') id: string) {
    await this.followProjectService.stopFollowProject(id);
    return res.status(200).json({
      msg: i18n()['message.followProject.deleted'],
    });
  }
}
