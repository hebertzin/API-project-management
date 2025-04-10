import { Module } from '@nestjs/common';
import { TaskListProjectController } from './controller/task-list-project.controller';
import { TaskListProjectService } from './service/task-list-project.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [TaskListProjectController],
  providers: [TaskListProjectService],
})
export class TaskListProjectModule {}
