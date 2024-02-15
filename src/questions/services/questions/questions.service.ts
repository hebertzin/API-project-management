import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Question } from 'src/questions/types/question';

@Injectable()
export class QuestionsService {
  constructor(private prismaService: PrismaService) {}

  async create(question: Question) {
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
    return question;
  }

  async findQuestionByIdAndUpdate(question_id: string, questionData: Question) {
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
}
