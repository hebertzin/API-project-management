import { Module } from '@nestjs/common';
import { ProjectIdeaController } from './controllers/project-idea.controller';
import { ProjectIdeaService } from './services/project-idea.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [ProjectIdeaController],
  providers: [ProjectIdeaService],
})
export class ProjectIdea {}
