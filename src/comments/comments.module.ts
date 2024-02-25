import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, ProjectsService, UserService, HashService],
})
export class CommentsModule {}
