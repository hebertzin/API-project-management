import { Test, TestingModule } from '@nestjs/testing';
import { FollowProjectService } from './follow-project.service';

describe('FollowProjectService', () => {
  let service: FollowProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowProjectService],
    }).compile();

    service = module.get<FollowProjectService>(FollowProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
