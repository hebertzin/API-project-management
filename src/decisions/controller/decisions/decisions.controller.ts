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
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { DecisionDTO } from 'src/decisions/dto/decisions.dto';
import { DecisionsService } from 'src/decisions/services/decisions/decisions.service';
import { i18n } from 'src/i18n';

@ApiTags('Decisions')
@Controller('decisions')
export class DecisionsController {
  constructor(private decisionService: DecisionsService) {}

  @ApiResponse({
    status: 201,
    description: i18n()['message.decisions.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
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
      message: i18n()['message.decisions.created'],
      desicion,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.decisions.get'],
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
  async findDecisionById(@Param('id') id: string, @Res() res: Response) {
    const decision = await this.decisionService.findDecisionById(id);

    return res.status(200).json({
      message: i18n()['message.decisions.get'],
      decision,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.decisions.deleted'],
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
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    await this.decisionService.findDecisionByIdAndDelete(id);

    return res.status(200).json({
      message: i18n()['message.decisions.deleted'],
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.decisions.update'],
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
      message: i18n()['message.decisions.update'],
      decision: updateDecision,
    });
  }
}
