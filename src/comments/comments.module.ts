import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, ProjectsService, UserService],
})
export class CommentsModule {}
