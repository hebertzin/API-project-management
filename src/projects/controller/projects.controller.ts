import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProjectDto } from 'src/projects/dto/project.dto';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { i18n } from 'src/i18n';
import { ProjectsService } from '../services/projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsServices: ProjectsService) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.project.created'],
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
  async create(
    @Body() dataProjects:
      ProjectDto, @Res()
    res: Response
  ) {
    const project = await this.projectsServices.create(dataProjects);
    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.project.created'],
      data: { project },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.project.get'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Reques',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id')
  async findProjectById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const project = await this.projectsServices.findById(id);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.project.get'],
      data: { project },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.project.userId'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get('all/:userId')
  async findAllProjects(
    @Param('userId') userId: string,
    @Res() res: Response
  ) {
    const allProjectsUsers =
      await this.projectsServices.findAllProjectsUser(userId);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.project.userId'],
      data: { allProjectsUsers },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.project.priority'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get('filter')
  async findProjectByPriority(
    @Query('priority') priority: string,
    @Res() res: Response,
  ) {
    const project = await this.projectsServices.findProjectsByPriority(priority);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.project.priority'],
      data: { project }
    });
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project has been deleted successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteProjectById(@Param('id') id: string, @Res() res: Response) {
    await this.projectsServices.deleteProjectById(id);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.project.deleted'],
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.project.update'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
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
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.project.update'],
      project,
    });
  }
}
