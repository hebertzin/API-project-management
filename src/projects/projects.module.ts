import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects.controller';
import { SharedServicesModule } from 'src/shared/shared-services.module';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [SharedServicesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
