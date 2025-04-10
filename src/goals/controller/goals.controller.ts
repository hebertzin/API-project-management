import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Res,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { GoalsService } from 'src/goals/services/goals.service';
import { Response } from 'express';
import { GoalDTO } from 'src/goals/dto/goal.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { i18n } from 'src/i18n';

@ApiTags('Goals')
@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.goals.get']
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getGoalById(
    @Param('id') id: string,
    @Body() res: Response
  ) {
    const goal = await this.goalsService.findGoalById(id);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.goals.get'],
      data: { goal },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.goals.created']
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
  async createGoal(
    @Body() goals: GoalDTO,
    @Res() res: Response
  ) {
    const goal = await this.goalsService.createGoal(goals);
    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.goals.created'],
      data: { goal },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.goals.update']
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
  async updateGoal(
    @Param('id') id: string,
    @Body() goals: GoalDTO,
    @Res() res: Response,
  ) {
    const goal = await this.goalsService.findGoalByIdAndUpdate(id, goals);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.goals.update'],
      data: { goal },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.goals.deleted']
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
  async deleteGoal(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    await this.goalsService.findGoalByIdAndDelete(id);
    return res.status(HttpStatus.NO_CONTENT)
  }
}
