import { Module } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { HashService } from 'src/hash/service/hash.service';
import { AuthService } from 'src/jwt/services/jwt.service';

@Module({
  providers: [UserService, ProjectsService, HashService, AuthService],
  exports: [UserService, ProjectsService, HashService, AuthService],
})
export class SharedServicesModule {}
