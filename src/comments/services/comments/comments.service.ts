import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async createComment() {}

  async findCommentById(comment_id: string) {}

  async findByIdAndUpdateComment(comment_id: stringm, data: any) {}

  async findByIdAndDeleteComment(comment_id: string) {}
}
