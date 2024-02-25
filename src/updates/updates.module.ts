import { Module } from '@nestjs/common';
import { UpdatesController } from './controller/updates/updates.controller';
import { UpdatesService } from './services/updates/updates.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [UpdatesController],
  providers: [UpdatesService, UserService, ProjectsService, HashService],
})
export class UpdatesModule {}
