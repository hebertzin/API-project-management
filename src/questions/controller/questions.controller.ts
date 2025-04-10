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
import { i18n } from 'src/i18n';

import { QuestionsDTO } from 'src/questions/dto/questions.dto';
import { QuestionsService } from 'src/questions/services/questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsServices: QuestionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.question.created'],
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
  async createQuestion(
    @Body() createQuestion: QuestionsDTO,
    @Res() res: Response,
  ) {
    const question =
      await this.questionsServices.createQuestion(createQuestion);
    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.question.created'],
      data: { question },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.question.get'],
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
  async findById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionsServices.findQuestionById(id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.question.get'],
      data: { question },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.question.userId'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get('all/:userId')
  async findAllQuestionsUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const question = await this.questionsServices.allQuestionsUser(userId);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.question.userId'],
      data: { question },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.question.update'],
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
  async updateQuestionById(
    @Param('id') id: string,
    @Body() updateQuestion: QuestionsDTO,
    @Res() res: Response,
  ) {
    const question = await this.questionsServices.findQuestionByIdAndUpdate(
      id,
      updateQuestion,
    );
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.question.update'],
      data: { question },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.question.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete(':id')
  async deleteQuestionById(@Param('id') id: string, @Res() res: Response) {
    await this.questionsServices.findQuestionByIdAndDelete(id);
    return res.status(HttpStatus.NO_CONTENT);
  }
}
