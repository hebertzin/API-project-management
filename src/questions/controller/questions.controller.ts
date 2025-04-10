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
import { i18n } from '../../../i18n';

import { QuestionsDTO } from 'src/questions/dto/questions.dto';
import { QuestionsService } from 'src/questions/services/questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsServices: QuestionsService) {}

  @ApiResponse({
    status: 201,
    description: i18n()['message.question.created'],
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
  async createQuestion(
    @Body() createQuestion: QuestionsDTO,
    @Res() res: Response,
  ) {
    const question =
      await this.questionsServices.createQuestion(createQuestion);
    return res.status(201).json({
      message: i18n()['message.question.created'],
      question,
    });
  }

  @ApiResponse({ status: 200, description: i18n()['message.question.get'] })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionsServices.findQuestionById(id);

    return res.status(200).json({
      message: i18n()['message.question.get'],
      question,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.question.userId'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/all/:userId')
  async findAllQuestionsUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const question = await this.questionsServices.allQuestionsUser(userId);

    return res.status(200).json({
      message: i18n()['message.question.userId'],
      question,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.question.update'],
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
  async updateQuestionById(
    @Param('id') id: string,
    @Body() updateQuestion: QuestionsDTO,
    @Res() res: Response,
  ) {
    const questionUpdated =
      await this.questionsServices.findQuestionByIdAndUpdate(
        id,
        updateQuestion,
      );
    return res.status(200).json({
      message: i18n()['message.question.update'],
      question: questionUpdated,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.question.deleted'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteQuestionById(@Param('id') id: string, @Res() res: Response) {
    await this.questionsServices.findQuestionByIdAndDelete(id);

    return res.status(200).json({
      message: i18n()['message.question.deleted'],
    });
  }
}
