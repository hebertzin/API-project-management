import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Res,
  Post,
  Put,
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
  constructor(private goalsService: GoalsService) {}

  @ApiResponse({ status: 200, description: i18n()['message.goals.get'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getGoalById(@Param('id') id: string, @Body() res: Response) {
    const goal = await this.goalsService.findGoalById(id);

    return res.status(200).json({
      message: i18n()['message.goals.get'],
      goal,
    });
  }

  @ApiResponse({ status: 201, description: i18n()['message.goals.created'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async createGoal(@Body() goals: GoalDTO, @Res() res: Response) {
    const create = await this.goalsService.createGoal(goals);

    return res.status(200).json({
      message: i18n()['message.goals.created'],
      create,
    });
  }

  @ApiResponse({ status: 200, description: i18n()['message.goals.update'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Put('/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() goals: GoalDTO,
    @Res() res: Response,
  ) {
    const update = await this.goalsService.findGoalByIdAndUpdate(id, goals);

    return res.status(200).json({
      message: i18n()['message.goals.update'],
      update,
    });
  }

  @ApiResponse({ status: 200, description: i18n()['message.goals.deleted'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteGoal(@Param('id') id: string, @Res() res: Response) {
    await this.goalsService.findGoalByIdAndDelete(id);

    return res.status(200).json({
      message: i18n()['message.goals.deleted'],
    });
  }
}
