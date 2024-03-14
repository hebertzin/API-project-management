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
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { DecisionDTO } from 'src/decisions/dto/decisions.dto';
import { DecisionsService } from 'src/decisions/services/decisions/decisions.service';

@Controller('decisions')
export class DecisionsController {
  constructor(private decisionService: DecisionsService) {}

  @ApiResponse({ status: 201, description: 'Decision created successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  async createDesision(
    @Body() createDecision: DecisionDTO,
    @Res() res: Response,
  ) {
    const desicion = await this.decisionService.create(createDecision);

    return res.status(201).json({
      message: 'Decision created successfully',
      desicion,
    });
  }

  @ApiResponse({ status: 200, description: 'Decision found successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : decision does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findDecisionById(@Param('id') id: string, @Res() res: Response) {
    const decision = await this.decisionService.findDecisionById(id);

    return res.status(200).json({
      msg: 'decision found',
      decision,
    });
  }

  @ApiResponse({ status: 200, description: 'Decision deleted successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : decision does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    await this.decisionService.findDecisionByIdAndDelete(id);

    return res.status(200).json({
      message: 'decision was deleted successfully',
    });
  }

  @ApiResponse({ status: 200, description: 'Decision updated successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : decision or user or project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Put('/:id')
  async findDecisionByIdAndUpdate(
    @Param('id') id: string,
    @Body() decision: DecisionDTO,
    @Res() res: Response,
  ) {
    const updateDecision = await this.decisionService.findDecisionByIdAndUpdate(
      id,
      decision,
    );

    return res.status(200).json({
      msg: 'descion updated successfully',
      decision: updateDecision,
    });
  }
}
