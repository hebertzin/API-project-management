import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FollowProjectService } from 'src/follow-project/service/follow-project.service';
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
  constructor(private followProjectService: FollowProjectService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.followProject.created'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post(':projectId/follow')
  async followProject(
    @Body() data: any,
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ) {
    const follow = await this.followProjectService.followProject(
      projectId,
      data.userId,
    );

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.followProject.created'],
      data: { follow },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.followProject.all'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':projectId/followers')
  async allFollowers(
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ) {
    const followers =
      await this.followProjectService.getProjectsUserFollow(projectId);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.followProject.all'],
      data: { followers },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.followProject.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete('/:id/stop')
  async stopFollowProject(@Res() res: Response, @Param('id') id: string) {
    await this.followProjectService.stopFollowProject(id);
    return res.status(HttpStatus.NO_CONTENT)
  }
}
