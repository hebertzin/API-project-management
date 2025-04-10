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
import { TaskListProjectService } from 'src/task-list-project/service/task-list-project.service';
import { Response } from 'express';
import { i18n } from 'src/i18n';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('task')
export class TaskListProjectController {
  constructor(private taskListService: TaskListProjectService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.taskList.get'],
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
  async findById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const taskList = await this.taskListService.findTaskById(id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.taskList.get'],
      data: { taskList },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.taskList.created'],
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
  async createTask(@Body() data: any, @Res() res: Response) {
    const taskList = await this.taskListService.createTaskProject(data);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.taskList.created'],
      data: { taskList },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.taskList.update'],
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
  async updateTask(
    @Param() id: string,
    @Body() data: any,
    @Res() res: Response,
  ) {
    const taskList = await this.taskListService.updateTask(id, data);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.taskList.update'],
      data: { taskList },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.taskList.deleted'],
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
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    await this.taskListService.deleteTask(id);

    return res.status(HttpStatus.NO_CONTENT)
  }
}
