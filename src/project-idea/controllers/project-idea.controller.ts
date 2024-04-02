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
import { i18n } from 'src/i18n';

@ApiTags('Project-idea')
@Controller('projectIdea')
export class ProjectIdeaController {
  constructor(private projectIdeaService: ProjectIdeaService) {}

  @ApiResponse({ status: 200, description: i18n()['message.projectIdea.get'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getProjectIdeaById(@Param('id') id: string, @Res() res: Response) {
    const projectIdea = await this.projectIdeaService.findProjectIdeaById(id);

    return res.status(200).json({
      message: i18n()['message.projectIdea.get'],
      projectIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.projectIdea.userId'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
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
      message: i18n()['message.projectIdea.userId'],
      allProjectsIdeas,
    });
  }

  @ApiResponse({
    status: 201,
    description: i18n()['message.projectIdea.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
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
      message: i18n()['message.projectIdea.created'],
      projectIdea: createIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.projectIdea.update'],
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
      message: i18n()['message.projectIdea.update'],
      update: updateIdea,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.projectIdea.deleted'],
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
  async deleteProjectIdea(@Param('id') id: string, @Res() res: Response) {
    await this.projectIdeaService.DeleteProjectIdea(id);

    return res.status(200).json({
      message: i18n()['message.projectIdea.deleted'],
    });
  }
}
