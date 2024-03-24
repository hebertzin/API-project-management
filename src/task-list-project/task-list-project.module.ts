import { Module } from '@nestjs/common';
import { TaskListProjectController } from './controller/task-list-project/task-list-project.controller';
import { TaskListProjectService } from './service/task-list-project/task-list-project.service';

@Module({
  controllers: [TaskListProjectController],
  providers: [TaskListProjectService],
})
export class TaskListProjectModule {}
