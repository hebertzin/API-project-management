import { Module } from '@nestjs/common';
import { TeamController } from './controller/team/team.controller';
import { TeamService } from './services/team/team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
