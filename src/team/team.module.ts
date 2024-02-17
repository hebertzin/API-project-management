import { Module } from '@nestjs/common';
import { TeamController } from './controller/team/team.controller';
import { TeamService } from './services/team/team.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, UserService],
})
export class TeamModule {}
