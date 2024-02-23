import { Module } from '@nestjs/common';
import { ProjectIdeaController } from './controllers/project-idea.controller';
import { ProjectIdeaService } from './services/project-idea.service';

@Module({
  controllers: [ProjectIdeaController],
  providers: [ProjectIdeaService],
})
export class ProjectIdea {}
