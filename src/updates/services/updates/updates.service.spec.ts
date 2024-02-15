import { Test, TestingModule } from '@nestjs/testing';
import { UpdatesService } from './updates.service';

describe('UpdatesService', () => {
  let service: UpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatesService],
    }).compile();

    service = module.get<UpdatesService>(UpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
