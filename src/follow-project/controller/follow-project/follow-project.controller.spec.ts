import { Test, TestingModule } from '@nestjs/testing';
import { FollowProjectController } from './follow-project.controller';

describe('FollowProjectController', () => {
  let controller: FollowProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowProjectController],
    }).compile();

    controller = module.get<FollowProjectController>(FollowProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
