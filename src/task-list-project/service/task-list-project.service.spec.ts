import { Test, TestingModule } from '@nestjs/testing';
import { TaskListProjectService } from './task-list-project.service';

describe('TaskListProjectService', () => {
  let service: TaskListProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskListProjectService],
    }).compile();

    service = module.get<TaskListProjectService>(TaskListProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
