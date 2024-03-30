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
import { GoalsService } from 'src/goals/services/goals/goals.service';
import { Response } from 'express';
import { GoalDTO } from 'src/goals/dto/goal.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Goals')
@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @ApiResponse({ status: 200, description: 'Goal found sucessfuly' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : goal does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getGoalById(@Param('id') id: string, @Body() res: Response) {
    const goal = await this.goalsService.findGoalById(id);

    return res.status(200).json({
      message: 'goalFound',
      goal,
    });
  }

  @ApiResponse({ status: 201, description: 'Goal created sucessfuly' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project or user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async createGoal(@Body() goals: GoalDTO, @Res() res: Response) {
    const create = await this.goalsService.createGoal(goals);

    return res.status(200).json({
      message: 'create goal successfully',
      create,
    });
  }

  @ApiResponse({ status: 200, description: 'Goal updated sucessfuly' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : goal or project or user does not exist',
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
      message: 'update goal successfully',
      update,
    });
  }

  @ApiResponse({ status: 200, description: 'Goal deleted sucessfuly' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : goal does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteGoal(@Param('id') id: string, @Res() res: Response) {
    await this.goalsService.findGoalByIdAndDelete(id);

    return res.status(200).json({
      message: 'goal deleted',
    });
  }
}
