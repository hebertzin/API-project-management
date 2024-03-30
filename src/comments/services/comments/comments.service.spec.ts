import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { LoggerService } from 'src/logger/logger.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { PrismaService } from 'src/database/prisma.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        UserService,
        PrismaService,
        HashService,
        ProjectsService,
        LoggerService,
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
