import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProjectDto } from 'src/projects/dto/project.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { i18n } from 'src/i18n';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectsController {
  constructor(private projectsServices: ProjectsService) {}

  @ApiResponse({
    status: 201,
    description: i18n()['message.project.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async create(@Body() dataProjects: ProjectDto, @Res() res: Response) {
    const createProject = await this.projectsServices.create(dataProjects);
    return res.status(201).json({
      msg: i18n()['message.project.created'],
      project: createProject,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.project.get'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Reques',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findProjectById(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsServices.findById(id);
    return res.status(200).json({
      message: i18n()['message.project.get'],
      project,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.project.userId'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/all/:userId')
  async findAllProjects(@Param('userId') userId: string, @Res() res: Response) {
    const allProjectsUsers =
      await this.projectsServices.findAllProjectsUser(userId);
    return res.status(200).json({
      msg: i18n()['message.project.userId'],
      projects: allProjectsUsers,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.project.priority'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/filter')
  async findProjectByPriority(
    @Query('priority') priority: string,
    @Res() res: Response,
  ) {
    await this.projectsServices.findProjectsByPriority(priority);
    return res.status(200).json({
      msg: i18n()['message.project.priority'],
    });
  }
  @ApiResponse({
    status: 200,
    description: 'Project has been deleted successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteProjectById(@Param('id') id: string, @Res() res: Response) {
    await this.projectsServices.deleteProjectById(id);
    return res.status(200).json({
      msg: i18n()['message.project.deleted'],
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.project.update'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Put('/:id')
  async updateProjectById(
    @Param('id') id: string,
    @Body() dataProject: ProjectDto,
    @Res() res: Response,
  ) {
    const project = await this.projectsServices.updateProjectById(
      id,
      dataProject,
    );
    return res.status(200).json({
      msg: i18n()['message.project.update'],
      project,
    });
  }
}
