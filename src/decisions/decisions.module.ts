import { Module } from '@nestjs/common';
import { DecisionsController } from './controller/decisions/decisions.controller';
import { DecisionsService } from './services/decisions/decisions.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { AuthService } from 'src/jwt/services/jwt.service';

@Module({
  controllers: [DecisionsController],
  providers: [
    DecisionsService,
    UserService,
    ProjectsService,
    HashService,
    AuthService,
  ],
})
export class DecisionsModule {}
