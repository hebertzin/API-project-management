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
import { ProjectDto } from 'src/projects/dto/project.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { Response } from 'express';

@Controller('/projects')
export class ProjectsController {
  constructor(private projectsServices: ProjectsService) {}

  @Post('')
  async create(@Body() dataProjects: ProjectDto, @Res() res: Response) {
    const createProject = await this.projectsServices.create(dataProjects);
    return res.status(201).json({
      msg: 'project created successfully',
      project: createProject,
    });
  }

  @Get('/:id')
  async findProjectById(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsServices.findById(id);
    return res.status(200).json({
      msg: 'project found successfully',
      project,
    });
  }

  @Get('/all/:userId')
  async findAllProjects(@Param('id') userId: string, @Res() res: Response) {
    const allProjectsUsers =
      await this.projectsServices.findAllProjectsUser(userId);
    return res.status(200).json({
      msg: 'all projects found successfully',
      projects: allProjectsUsers,
    });
  }

  @Delete('/:id')
  async deleteProjectById(@Param('id') id: string, @Res() res: Response) {
    await this.projectsServices.deleteProjectById(id);
    return res.status(200).json({
      msg: 'project deleted successfully',
    });
  }

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
