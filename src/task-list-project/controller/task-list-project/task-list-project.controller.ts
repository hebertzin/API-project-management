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
import { TaskListProjectService } from 'src/task-list-project/service/task-list-project/task-list-project.service';
import { Response } from 'express';
import { i18n } from 'src/i18n';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('task')
export class TaskListProjectController {
  constructor(private taskListService: TaskListProjectService) {}

  @ApiResponse({
    status: 201,
    description: i18n()['message.taskList.get'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.taskListService.findTaskById(id);

    return res.status(200).json({
      message: i18n()['message.taskList.get'],
      question,
    });
  }

  @ApiResponse({
    status: 201,
    description: i18n()['message.taskList.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('/')
  async createTask(@Body() data: any, @Res() res: Response) {
    const question = await this.taskListService.createTaskProject(data);

    return res.status(200).json({
      message: i18n()['message.taskList.created'],
      question,
    });
  }

  @ApiResponse({
    status: 201,
    description: i18n()['message.taskList.update'],
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
  async updateTask(
    @Param() id: string,
    @Body() data: any,
    @Res() res: Response,
  ) {
    const question = await this.taskListService.updateTask(id, data);

    return res.status(200).json({
      message: i18n()['message.taskList.update'],
      question,
    });
  }

  @ApiResponse({
    status: 201,
    description: i18n()['message.taskList.deleted'],
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
  async deleteTask(@Param('id') id: string, @Res() res: Response) {
    const question = await this.taskListService.deleteTask(id);

    return res.status(200).json({
      message: i18n()['message.taskList.deleted'],
      question,
    });
  }
}
