import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsController } from './projects/controller/projects/projects.controller';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/services/user/user.service';
import { PrismaService } from './database/prisma.service';
import { ProjectsService } from './projects/services/projects/projects.service';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { ProfileController } from './profile/controller/profile/profile.controller';

@Module({
  imports: [ProfileModule, UserModule, ProjectsModule],
  controllers: [ProjectsController, UserController, ProfileController],
  providers: [AppService, UserService, PrismaService, ProjectsService],
  exports: [PrismaService],
})
export class AppModule {}
