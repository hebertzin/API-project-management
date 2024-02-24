import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UserService],
})
export class ProjectsModule {}
