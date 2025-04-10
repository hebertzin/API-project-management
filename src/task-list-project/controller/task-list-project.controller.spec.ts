import { Test, TestingModule } from '@nestjs/testing';
import { TaskListProjectController } from './task-list-project.controller';

describe('TaskListProjectController', () => {
  let controller: TaskListProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskListProjectController],
    }).compile();

    controller = module.get<TaskListProjectController>(
      TaskListProjectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
