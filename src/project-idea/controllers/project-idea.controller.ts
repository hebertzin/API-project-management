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
import { ProjectIdeaService } from '../services/project-idea.service';
import { Response } from 'express';
import { CreateProjectIdeaDTO } from '../dto/projectIdea.dto';

@Controller('projectIdea')
export class ProjectIdeaController {
  constructor(private projectIdeaService: ProjectIdeaService) {}

  @Get('/:id')
  async getProjectIdeaById(@Param('id') id: string, @Res() res: Response) {
    const projectIdea = await this.projectIdeaService.findProjectIdeaById(id);

    return res.status(200).json({
      msg: 'project idea are here',
      projectIdea,
    });
  }

  @Get('/userId/all')
  async getAllProjectIdea(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const allProjectsIdeas =
      await this.projectIdeaService.findAllProjectIdeas(userId);

    return res.status(200).json({
      msg: 'all projects ideas are here',
      allProjectsIdeas,
    });
  }

  @Post()
  async createProjectIdea(
    @Body() createProjectIdea: CreateProjectIdeaDTO,
    @Res() res: Response,
  ) {
    const createIdea =
      await this.projectIdeaService.createProjectIdea(createProjectIdea);

    return res.status(201).json({
      msg: 'idea was created',
      projectIdea: createIdea,
    });
  }

  @Put('/:id')
  async updateProjectIdea(
    @Param('id') id: string,
    @Body() updateProjectIdea: CreateProjectIdeaDTO,
    @Res() res: Response,
  ) {
    const updateIdea = await this.projectIdeaService.updateProjectIdea(
      id,
      updateProjectIdea,
    );

    return res.status(200).json({
      msg: 'project idea was updated',
      update: updateIdea,
    });
  }

  @Delete('/:id')
  async deleteProjectIdea(@Param('id') id: string, @Res() res: Response) {
    await this.projectIdeaService.DeleteProjectIdea(id);

    return res.status(200).json({
      msg: 'project idea was deleted',
    });
  }
}
