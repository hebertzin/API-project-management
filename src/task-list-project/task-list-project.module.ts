import { Module } from '@nestjs/common';
import { TaskListProjectController } from './controller/task-list-project/task-list-project.controller';
import { TaskListProjectService } from './service/task-list-project/task-list-project.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [TaskListProjectController],
  providers: [
    TaskListProjectService,
    UserService,
    ProjectsService,
    HashService,
  ],
})
export class TaskListProjectModule {}
