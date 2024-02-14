import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}