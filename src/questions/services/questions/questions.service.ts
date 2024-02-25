import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TQuestion } from 'src/questions/types/question';
import { UserService } from 'src/user/services/user/user.service';
import { Questions } from '@prisma/client';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class QuestionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  async createQuestion(question: TQuestion): Promise<Questions> {
    try {
      await this.userService.checkUserExistence(question.userId);
      const questions = await this.prismaService.questions.create({
        data: {
          ...question,
        },
      });

      return questions;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findQuestionById(question_id: string): Promise<Questions> {
    try {
      const question = await this.prismaService.questions.findUnique({
        where: {
          id: question_id,
        },
      });
      if (!question) {
        throw new NotFoundException(RESOURSE_NOT_FOUND);
      }
      return question;
    } catch (error) {
      this.logger.error(`some error ocurred: ${error.message}`);
      throw error;
    }
  }

  async findQuestionByIdAndUpdate(
    question_id: string,
    questionData: TQuestion,
  ): Promise<Questions> {
    try {
      await this.userService.checkUserExistence(questionData.userId);
      const question = await this.prismaService.questions.update({
        where: {
          id: question_id,
        },
        data: {
          ...questionData,
        },
      });
      return question;
    } catch (error) {
      this.logger.error(`some error ocurred ${error.message}`);
      throw error;
    }
  }

  async findQuestionByIdAndDelete(question_id: string): Promise<Questions> {
    try {
      return await this.prismaService.questions.delete({
        where: {
          id: question_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async allQuestionsUser(user_id: string): Promise<Questions[]> {
    try {
      await this.userService.checkUserExistence(user_id);
      const allQuestions = await this.prismaService.questions.findMany({
        where: {
          userId: user_id,
        },
      });
      return allQuestions;
    } catch (error) {
      this.logger.error(`some error ocurring : ${error.message}`);
      throw error;
    }
  }
}
