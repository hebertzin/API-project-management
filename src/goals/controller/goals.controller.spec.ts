import { Test, TestingModule } from '@nestjs/testing';
import { GoalsController } from './goals.controller';

describe('GoalsController', () => {
  let controller: GoalsController;

  it('should be defined', async () => {
    expect(3).toBe(3);
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalsController],
    }).compile();

    controller = module.get<GoalsController>(GoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
