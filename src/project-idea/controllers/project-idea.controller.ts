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

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.projectIdea.get'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id')
  async getProjectIdeaById(@Param('id') id: string, @Res() res: Response) {
    const projectIdea = await this.projectIdeaService.findProjectIdeaById(id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.projectIdea.get'],
      data: { projectIdea },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.projectIdea.userId'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id/all')
  async getAllProjectIdea(@Param('id') userId: string, @Res() res: Response) {
    const projectsIdeas =
      await this.projectIdeaService.findAllProjectIdeas(userId);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.projectIdea.userId'],
      data: { projectsIdeas },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.projectIdea.created'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post()
  async createProjectIdea(
    @Body() createProjectIdea: CreateProjectIdeaDTO,
    @Res() res: Response,
  ) {
    const idea =
      await this.projectIdeaService.createProjectIdea(createProjectIdea);

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.projectIdea.created'],
      data: { idea },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.projectIdea.update'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Put(':id')
  async updateProjectIdea(
    @Param('id') id: string,
    @Body() updateProjectIdea: CreateProjectIdeaDTO,
    @Res() res: Response,
  ) {
    const idea = await this.projectIdeaService.updateProjectIdea(
      id,
      updateProjectIdea,
    );

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.projectIdea.update'],
      data: { idea },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.projectIdea.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete(':id')
  async deleteProjectIdea(@Param('id') id: string, @Res() res: Response) {
    await this.projectIdeaService.DeleteProjectIdea(id);

    return res.status(HttpStatus.NO_CONTENT);
  }
}
