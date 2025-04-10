import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from 'src/comments/types/comments';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { Comments } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { i18n } from 'src/i18n';

@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
    private logger: LoggerService,
  ) {}

  async createComment(data: Comment): Promise<Comments> {
    try {
      await this.userService.checkUserExistence(data.userId);
      await this.projectService.checkProjectExistence(data.projectId);
      //add logic to verify question_id later
      const createComment = await this.prismaService.comments.create({
        data: {
          ...data,
        },
      });
      return createComment;
    } catch (error) {
      this.logger.error(`some errror ocurred : ${error.message}`);
      throw error;
    }
  }

  async findCommentById(comment_id: string): Promise<Comments | null> {
    try {
      const comment = await this.prismaService.comments.findUnique({
        where: {
          id: comment_id,
        },
      });
      if (!comment) {
        throw new NotFoundException();
      }

      return comment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(i18n()['exception.notFound'], comment_id);
      }

      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findByIdAndUpdateComment(
    comment_id: string,
    data: Comment,
  ): Promise<Comments> {
    try {
      await this.userService.checkUserExistence(data.userId);
      await this.projectService.checkProjectExistence(data.projectId);
      const updateComment = await this.prismaService.comments.update({
        where: {
          id: comment_id,
        },
        data: {
          ...data,
        },
      });
      return updateComment;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findByIdAndDeleteComment(comment_id: string): Promise<Comments | null> {
    try {
      await this.findCommentById(comment_id);
      return await this.prismaService.comments.delete({
        where: {
          id: comment_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
