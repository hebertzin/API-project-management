import { Module } from '@nestjs/common';
import { FollowProjectService } from './service/follow-project/follow-project.service';
import { FollowProjectController } from './controller/follow-project/follow-project.controller';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Module({
  providers: [FollowProjectService, UserService, ProjectsService],
  controllers: [FollowProjectController],
})
export class FollowProjectModule {}
