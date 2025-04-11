import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from 'src/comments/types/comments';
import { PrismaService } from 'src/database/prisma.service';
import { Comments } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { ProjectsService } from 'src/projects/services/projects.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private projectService: ProjectsService,
    private logging: LoggerService,
  ) { }
  async save(data: Comment): Promise<Comments> {
    this.logging.log(`[CommentService] Starting to create comment for user ${data.userId} on project ${data.projectId}`);
  
    await Promise.all([
      this.userService.checkUserExistence(data.userId),
      this.projectService.checkProjectExistence(data.projectId),
    ]);
  
    return this.prismaService.comments.create({ data });
  }

  async findById(id: string): Promise<Comments> {
    this.logging.log(`[CommentService] Finding comment with ID: ${id}`);
  
    const comment = await this.prismaService.comments.findUnique({ where: { id } });
  
    if (!comment) {
      this.logging.warn(`[CommentService] Comment not found with ID: ${id}`);
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  
    return comment;
  }
  
  async update(
    id: string,
    data: Comment,
  ): Promise<Comments> {
    this.logging.log(`[CommentService] Starting to update comment for user ${data.userId} on project ${data.projectId}`);

    await Promise.all([
      this.userService.checkUserExistence(data.userId),
      this.projectService.checkProjectExistence(data.projectId),
    ])

    const sanitizedData = {
      comment: data.comment,
      projectId: data.projectId,
      questionId: data.questionId,
      userId: data.userId
    };

    return this.prismaService.comments.update({
      where: { id },
      data: sanitizedData,
    });;
  }

  async delete(id: string): Promise<Comments> {
    this.logging.log(`[CommentService] Deleting comment ${id}`);
  
    return this.prismaService.comments.delete({
      where: { id },
    });
  }

}