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
import { Response } from 'express';
import { DecisionDTO } from 'src/decisions/dto/decisions.dto';
import { DecisionsService } from 'src/decisions/services/decisions/decisions.service';

@Controller('decisions')
export class DecisionsController {
  constructor(private decisionService: DecisionsService) {}

  @Post()
  async createDesision(
    @Body() createDecision: DecisionDTO,
    @Res() res: Response,
  ) {
    const desicion = await this.decisionService.create(createDecision);

    return res.status(201).json({
      msg: 'decision created successfully',
      desicion,
    });
  }

  @Get('/:id')
  async findDecisionById(@Param('id') id: string, @Res() res: Response) {
    const decision = await this.decisionService.findById(id);

    return res.status(200).json({
      msg: 'decision found',
      decision,
    });
  }

  @Delete('/:id')
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    await this.decisionService.delete(id);

    return res.status(200).json({
      msg: 'decision was deleted successfully',
    });
  }
  @Put('/:id')
  async findDecisionByIdAndUpdate(
    @Param('id') id: string,
    @Body() decision: DecisionDTO,
    @Res() res: Response,
  ) {
    const updateDecision = await this.decisionService.update(id, decision);

    return res.status(200).json({
      msg: 'descion updated successfully',
      decision: updateDecision,
    });
  }
}
