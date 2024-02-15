import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Question } from 'src/questions/types/question';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class QuestionsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(question: Question) {
    await this.userService.checkUserExistence(question.userId);
    const questions = await this.prismaService.prisma.questions.create({
      data: {
        ...question,
      },
    });
    return questions;
  }

  async findQuestionById(question_id: string) {
    const question = await this.prismaService.prisma.questions.findUnique({
      where: {
        id: question_id,
      },
    });
    if (!question) {
      throw new NotFoundException(`question ${question_id} not found`);
    }
    return question;
  }

  async findQuestionByIdAndUpdate(question_id: string, questionData: Question) {
    await this.userService.checkUserExistence(questionData.userId);
    const question = await this.prismaService.prisma.questions.update({
      where: {
        id: question_id,
      },
      data: {
        ...questionData,
      },
    });
    return question;
  }

  async findByIdAndDelete(question_id: string) {
    await this.prismaService.prisma.questions.delete({
      where: {
        id: question_id,
      },
    });
  }

  async allQuestionsUser(user_id) {
    await this.userService.checkUserExistence(user_id);
    const allQuestions = await this.prismaService.prisma.questions.findMany({
      where: {
        userId: user_id,
      },
    });
    return allQuestions;
  }
}
