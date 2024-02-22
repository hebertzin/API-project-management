import { Module } from '@nestjs/common';
import { DecisionsController } from './controller/decisions/decisions.controller';
import { DecisionsService } from './services/decisions/decisions.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Module({
  controllers: [DecisionsController],
  providers: [DecisionsService, UserService, ProjectsService],
})
export class DecisionsModule {}
