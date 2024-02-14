import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsController } from './projects/controller/projects/projects.controller';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/services/user/user.service';
import { PrismaService } from './database/prisma.service';
import { ProjectsService } from './projects/services/projects/projects.service';

@Module({
  imports: [],
  controllers: [ProjectsController, UserController],
  providers: [AppService, UserService, PrismaService, ProjectsService],
  exports: [PrismaService],
})
export class AppModule {}
