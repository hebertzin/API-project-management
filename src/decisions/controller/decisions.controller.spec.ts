import { Test, TestingModule } from '@nestjs/testing';
import { DecisionsController } from './decisions.controller';

describe('DecisionsController', () => {
  let controller: DecisionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecisionsController],
    }).compile();

    controller = module.get<DecisionsController>(DecisionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
