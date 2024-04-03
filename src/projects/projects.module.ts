import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { AuthService } from 'src/jwt/services/jwt.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UserService, HashService, AuthService],
})
export class ProjectsModule {}
