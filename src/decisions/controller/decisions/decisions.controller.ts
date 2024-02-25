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
    try {
      const desicion = await this.decisionService.create(createDecision);

      return res.status(201).json({
        msg: 'decision created successfully',
        desicion,
      });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
        errorName: error.name,
        status: error.status,
      });
    }
  }

  @Get('/:id')
  async findDecisionById(@Param('id') id: string, @Res() res: Response) {
    try {
      const decision = await this.decisionService.findDecisionById(id);

      return res.status(200).json({
        msg: 'decision found',
        decision,
      });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
        errorName: error.name,
        status: error.status,
      });
    }
  }

  @Delete('/:id')
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.decisionService.findDecisionByIdAndDelete(id);

      return res.status(200).json({
        message: 'decision was deleted successfully',
      });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
        errorName: error.name,
        status: error.status,
      });
    }
  }
  @Put('/:id')
  async findDecisionByIdAndUpdate(
    @Param('id') id: string,
    @Body() decision: DecisionDTO,
    @Res() res: Response,
  ) {
    try {
      const updateDecision =
        await this.decisionService.findDecisionByIdAndUpdate(id, decision);

      return res.status(200).json({
        msg: 'descion updated successfully',
        decision: updateDecision,
      });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
        errorName: error.name,
        status: error.status,
      });
    }
  }
}
