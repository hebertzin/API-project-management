import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
