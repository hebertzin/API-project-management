import { Module } from '@nestjs/common';
import { ProjectIdeaController } from './controllers/project-idea.controller';
import { ProjectIdeaService } from './services/project-idea.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [ProjectIdeaController],
  providers: [ProjectIdeaService, UserService, HashService],
})
export class ProjectIdea {}
