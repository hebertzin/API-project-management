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
import { QuestionsDTO } from 'src/questions/dto/questions.dto';
import { QuestionsService } from 'src/questions/services/questions/questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsServices: QuestionsService) {}

  @Post()
  async createQuestion(
    @Body() createQuestion: QuestionsDTO,
    @Res() res: Response,
  ) {
    const question = await this.questionsServices.create(createQuestion);
    return res.status(201).json({
      msg: 'question created successfully',
      question,
    });
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionsServices.findQuestionById(id);

    return res.status(200).json({
      msg: 'question found successfully',
      question,
    });
  }

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
      msg: 'question updated',
      question: questionUpdated,
    });
  }

  @Delete('/:id')
  async deleteQuestionById(@Param('id') id: string, @Res() res: Response) {
    await this.questionsServices.findByIdAndDelete(id);

    return res.status(200).json({
      msg: 'question deleted',
    });
  }
}
