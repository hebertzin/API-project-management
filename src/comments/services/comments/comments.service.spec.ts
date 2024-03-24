import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { LoggerService } from 'src/logger/logger.service';
import { Comment } from 'src/comments/types/comments';
import { Comments } from '@prisma/client';

describe('CommentsService', () => {
  let service: CommentsService;
  let prismaService: PrismaService;
  let userService: UserService;
  let projectService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        PrismaService,
        UserService,
        ProjectsService,
        LoggerService,
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const commentData: Comment = {
        userId: 'user_id',
        projectId: 'project_id',
        comment: 'comentarios',
        questionId: 'Test comment',
      };

      jest
        .spyOn(userService, 'checkUserExistence')
        .mockResolvedValueOnce(undefined);
      jest
        .spyOn(projectService, 'checkProjectExistence')
        .mockResolvedValueOnce(undefined);
      jest
        .spyOn(prismaService.comments, 'create')
        .mockResolvedValueOnce(commentData as Comments);

      const createdComment = await service.createComment(commentData);

      expect(createdComment).toEqual(commentData as Comments);
      expect(userService.checkUserExistence).toHaveBeenCalledWith('user_id');
      expect(projectService.checkProjectExistence).toHaveBeenCalledWith(
        'project_id',
      );
      expect(prismaService.comments.create).toHaveBeenCalledWith({
        data: commentData,
      });
    });

    it('should throw an error if user does not exist', async () => {
      const commentData: Comment = {
        userId: 'user_id',
        projectId: 'project_id',
        comment: 'Test comment',
        questionId: 'question_id',
      };

      jest
        .spyOn(userService, 'checkUserExistence')
        .mockRejectedValueOnce(new Error('User not found'));

      await expect(service.createComment(commentData)).rejects.toThrowError(
        'User not found',
      );
    });

    it('should throw an error if project does not exist', async () => {
      const commentData: Comment = {
        userId: 'user_id',
        projectId: 'project_id',
        comment: 'Test comment',
        questionId: '',
      };

      jest
        .spyOn(userService, 'checkUserExistence')
        .mockResolvedValueOnce(undefined);
      jest
        .spyOn(projectService, 'checkProjectExistence')
        .mockRejectedValueOnce(new Error('Project not found'));

      await expect(service.createComment(commentData)).rejects.toThrowError(
        'Project not found',
      );
    });
  });
});
