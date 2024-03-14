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
import { QuestionsDTO } from 'src/questions/dto/questions.dto';
import { QuestionsService } from 'src/questions/services/questions/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsServices: QuestionsService) {}

  @ApiResponse({ status: 201, description: 'Question created successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : project or user does not exist',
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
      message: 'question created successfully',
      question,
    });
  }

  @ApiResponse({ status: 200, description: 'Question found successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : question does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionsServices.findQuestionById(id);

    return res.status(200).json({
      message: 'question found successfully',
      question,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'All Question by user found successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
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
      message: 'all Questions user',
      question,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or project does not exist',
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
      message: 'question updated',
      question: questionUpdated,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
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
      message: 'question deleted',
    });
  }
}
