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
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { DecisionDTO } from 'src/decisions/dto/decisions.dto';
import { DecisionsService } from 'src/decisions/services/decisions.service';
import { i18n } from 'src/i18n';

@ApiTags('Decisions')
@Controller('decisions')
export class DecisionsController {
  constructor(private decisionService: DecisionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.decisions.created'],
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
  async createDesision(
    @Body() createDecision: DecisionDTO,
    @Res() res: Response,
  ) {
    const decision = await this.decisionService.create(createDecision);

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.decisions.created'],
      data: { decision },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.decisions.get'],
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
  async findDecisionById(@Param('id') id: string, @Res() res: Response) {
    const decision = await this.decisionService.findDecisionById(id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.decisions.get'],
      decision,
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.decisions.get'],
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
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    await this.decisionService.findDecisionByIdAndDelete(id);
    return res.status(HttpStatus.NO_CONTENT);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.decisions.update'],
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
  async findDecisionByIdAndUpdate(
    @Param('id') id: string,
    @Body() decisionDTO: DecisionDTO,
    @Res() res: Response,
  ) {
    const decision = await this.decisionService.findDecisionByIdAndUpdate(
      id,
      decisionDTO,
    );

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.decisions.update'],
      data: { decision },
    });
  }
}
