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

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get('/:id')
  async getGoalById(@Param('id') id: string, @Body() res: Response) {
    const goal = await this.goalsService.findGoalById(id);

    return res.status(200).json({
      msg: 'goalFound',
      goal,
    });
  }

  @Post('')
  async createGoal(@Body() goals: GoalDTO, @Res() res: Response) {
    const create = await this.goalsService.createGoal(goals);

    return res.status(200).json({
      msg: 'create goal successfully',
      create,
    });
  }
  @Put('/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() goals: GoalDTO,
    @Res() res: Response,
  ) {
    const update = await this.goalsService.findGoalByIdAndUpdate(id, goals);

    return res.status(200).json({
      msg: 'update goal successfully',
      update,
    });
  }
  @Delete('/:id')
  async deleteGoal(@Param('id') id: string, @Res() res: Response) {
    await this.goalsService.findGoalByIdAndDelete(id);

    return res.status(200).json({
      msg: 'goal deleted',
    });
  }
}
