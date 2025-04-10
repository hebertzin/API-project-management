import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../comments.service';
import { UserService } from 'src/user/services/user/user.service';
import { PrismaService } from 'src/database/prisma.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { LoggerService } from 'src/logger/logger.service';
import { Comment } from 'src/comments/types/comments';
import { PrismaModule } from 'src/database/prisma.module';

describe('CommentsService', () => {
  let service: CommentsService;
  let userService: UserService;
  let projectService: ProjectsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        UserService,
        PrismaService,
        ProjectsService,
        HashService,
        LoggerService,
      ],
      imports: [PrismaModule],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    userService = module.get<UserService>(UserService);
    projectService = module.get<ProjectsService>(ProjectsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment', async () => {
    const commentData: Comment = {
      userId: 'user_id',
      projectId: 'project_id',
      comment: 'com',
      questionId: 'fda',
      // add other required fields
    };

    const createCommentSpy = jest
      .spyOn(prismaService.comments, 'create')
      .mockResolvedValueOnce(commentData as any);

    const checkUserExistenceSpy = jest
      .spyOn(userService, 'checkUserExistence')
      .mockResolvedValueOnce({
        id: 'fad',
        name: 'Hebert',
        email: 'hebert@example.com',
        emailStatus: 'PENDING',
        password: '203040',
        createAt: new Date(),
        updateAt: new Date(),
        teamMemberShipId: '303002',
      });

    const checkProjectExistenceSpy = jest
      .spyOn(projectService, 'checkProjectExistence')
      .mockResolvedValueOnce({
        id: 'uuid',
        name: 'Awesome Project',
        description: 'This is a sample project',
        priority: 'MIN',
        userId: 'fmadm',
        url: 'https://example.com/project',
        visibility: true,
        createAt: new Date(),
        updateAt: new Date(),
      });

    const createdComment = await service.createComment(commentData);

    expect(checkUserExistenceSpy).toHaveBeenCalledWith('user_id');
    expect(checkProjectExistenceSpy).toHaveBeenCalledWith('project_id');
    expect(createCommentSpy).toHaveBeenCalledWith({ data: commentData });
    expect(createdComment).toEqual(commentData as any);
  });
});
