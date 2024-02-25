import { Module } from '@nestjs/common';
import { TeamController } from './controller/team/team.controller';
import { TeamService } from './services/team/team.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, UserService, HashService],
})
export class TeamModule {}
