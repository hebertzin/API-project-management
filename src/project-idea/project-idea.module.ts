import { Module } from '@nestjs/common';
import { ProjectIdeaController } from './controllers/project-idea.controller';
import { ProjectIdeaService } from './services/project-idea.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';
import { AuthService } from 'src/jwt/services/jwt.service';

@Module({
  controllers: [ProjectIdeaController],
  providers: [ProjectIdeaService, UserService, HashService, AuthService],
})
export class ProjectIdea {}
