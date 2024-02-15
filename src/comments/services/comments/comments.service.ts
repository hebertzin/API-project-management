import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from 'src/comments/types/comments';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
  ) {}

  async createComment(data: Comment) {
    await this.userService.checkUserExistence(data.userId);
    await this.projectService.checkProjectExistence(data.projectId);
    //add logic to verify question_id later
    const createComment = await this.prismaService.prisma.comments.create({
      data: {
        ...data,
      },
    });
    return createComment;
  }

  async findCommentById(comment_id: string) {
    const comment = await this.prismaService.prisma.comments.findUnique({
      where: {
        id: comment_id,
      },
    });
    if (!comment) {
      throw new NotFoundException(`this comment ${comment_id} does not exist`);
    }

    return comment;
  }

  async findByIdAndUpdateComment(comment_id: string, data: Comment) {
    await this.userService.checkUserExistence(data.userId);
    await this.projectService.checkProjectExistence(data.projectId);
    const updateComment = await this.prismaService.prisma.comments.update({
      where: {
        id: comment_id,
      },
      data: {
        ...data,
      },
    });
    return updateComment;
  }

  async findByIdAndDeleteComment(comment_id: string) {
    await this.findCommentById(comment_id);
    return await this.prismaService.prisma.comments.delete({
      where: {
        id: comment_id,
      },
    });
  }
}
