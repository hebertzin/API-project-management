import { Module } from '@nestjs/common';
import { ProjectIdeaController } from './controllers/project-idea.controller';

@Module({
  controllers: [ProjectIdeaController],
})
export class ProjectIdea {}
