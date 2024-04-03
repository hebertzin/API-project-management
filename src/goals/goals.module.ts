import { Module } from '@nestjs/common';
import { GoalsController } from './controller/goals/goals.controller';
import { GoalsService } from './services/goals/goals.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { AuthService } from 'src/jwt/services/jwt.service';

@Module({
  controllers: [GoalsController],
  providers: [
    GoalsService,
    UserService,
    ProjectsService,
    HashService,
    AuthService,
  ],
})
export class GoalsModule {}
