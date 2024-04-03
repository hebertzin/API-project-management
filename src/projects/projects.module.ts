import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
