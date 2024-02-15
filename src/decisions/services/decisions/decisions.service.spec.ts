import { Test, TestingModule } from '@nestjs/testing';
import { DecisionsService } from './decisions.service';

describe('DecisionsService', () => {
  let service: DecisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionsService],
    }).compile();

    service = module.get<DecisionsService>(DecisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
