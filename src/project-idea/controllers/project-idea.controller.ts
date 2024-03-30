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
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Project-idea')
@Controller('projectIdea')
export class ProjectIdeaController {
  constructor(private projectIdeaService: ProjectIdeaService) {}

  @ApiResponse({ status: 200, description: 'Project idea found successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project idea does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getProjectIdeaById(@Param('id') id: string, @Res() res: Response) {
    const projectIdea = await this.projectIdeaService.findProjectIdeaById(id);

    return res.status(200).json({
      message: 'project idea',
      projectIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'All projects idea found successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:userId/all')
  async getAllProjectIdea(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const allProjectsIdeas =
      await this.projectIdeaService.findAllProjectIdeas(userId);

    return res.status(200).json({
      message: 'all projects ideas are here',
      allProjectsIdeas,
    });
  }

  @ApiResponse({
    status: 201,
    description: 'project idea created successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  async createProjectIdea(
    @Body() createProjectIdea: CreateProjectIdeaDTO,
    @Res() res: Response,
  ) {
    const createIdea =
      await this.projectIdeaService.createProjectIdea(createProjectIdea);

    return res.status(201).json({
      message: 'project idea created sucessfuly',
      projectIdea: createIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'project idea updated successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
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
      message: 'project idea was updated',
      update: updateIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'project idea delete successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project idea does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteProjectIdea(@Param('id') id: string, @Res() res: Response) {
    await this.projectIdeaService.DeleteProjectIdea(id);

    return res.status(200).json({
      message: 'project idea was deleted',
    });
  }
}
