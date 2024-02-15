import { Module } from '@nestjs/common';
import { ProjectsController } from './controller/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, UserService],
})
export class ProjectsModule {}
