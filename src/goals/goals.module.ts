import { Module } from '@nestjs/common';
import { GoalsController } from './controller/goals/goals.controller';
import { GoalsService } from './services/goals/goals.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService, PrismaService, UserService, ProjectsService],
})
export class GoalsModule {}
