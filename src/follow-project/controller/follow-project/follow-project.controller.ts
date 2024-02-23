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

@Controller('follow-project')
export class FollowProjectController {
  constructor(private followProjectService: FollowProjectService) {}

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
      msg: 'you started follow project',
      follow,
    });
  }

  @Get('/:projectId/all-followers')
  async allFollowers(
    @Res() res: Response,
    @Param('projectId') projectId: string,
  ) {
    const all =
      await this.followProjectService.getProjectsUserFollow(projectId);
    return res.status(200).json({
      msg: 'all followers of this project',
      all,
    });
  }
  @Delete('/:id/stop')
  async stopFollowProject(@Res() res: Response, @Param('id') id: string) {
    await this.followProjectService.stopFollowProject(id);
    return res.status(200).json({
      msg: 'you stop follow this project',
    });
  }
}
