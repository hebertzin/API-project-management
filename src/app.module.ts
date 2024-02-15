import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsController } from './projects/controller/projects/projects.controller';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/services/user/user.service';
import { ProjectsService } from './projects/services/projects/projects.service';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './database/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { QuestionsModule } from './questions/questions.module';
import { ProfileController } from './profile/controller/profile/profile.controller';
import { ProfileService } from './profile/services/profile/profile.service';

@Module({
  imports: [
    UserModule,
    ProjectsModule,
    PrismaModule,
    ProfileModule,
    QuestionsModule,
  ],
  controllers: [ProjectsController, UserController, ProfileController],
  providers: [AppService, UserService, ProjectsService, ProfileService],
})
export class AppModule {}
