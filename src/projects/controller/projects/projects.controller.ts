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
} from '@nestjs/swagger';

@Controller('/projects')
export class ProjectsController {
  constructor(private projectsServices: ProjectsService) {}

  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async create(@Body() dataProjects: ProjectDto, @Res() res: Response) {
    const createProject = await this.projectsServices.create(dataProjects);
    return res.status(201).json({
      msg: 'project created successfully',
      project: createProject,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Project found successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findProjectById(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsServices.findById(id);
    return res.status(200).json({
      msg: 'project found successfully',
      project,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'All project found successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
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
      msg: 'all projects found successfully',
      projects: allProjectsUsers,
    });
  }
  @Get('/filter')
  async findProjectByPriority(
    @Query('priority') priority: string,
    @Res() res: Response,
  ) {
    await this.projectsServices.findProjectsByPriority(priority);
    return res.status(200).json({
      msg: 'projects found successfully',
    });
  }
  @ApiResponse({
    status: 200,
    description: 'Project delete successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteProjectById(@Param('id') id: string, @Res() res: Response) {
    await this.projectsServices.deleteProjectById(id);
    return res.status(200).json({
      msg: 'project deleted successfully',
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Project update successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project or user does not exist',
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
      msg: 'Project updated successfully',
      project,
    });
  }
}
