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
import { UpdatesModule } from './updates/updates.module';
import { DecisionsModule } from './decisions/decisions.module';
import { DecisionsController } from './decisions/controller/decisions/decisions.controller';
import { DecisionsService } from './decisions/services/decisions/decisions.service';
import { UpdatesController } from './updates/controller/updates/updates.controller';
import { UpdatesService } from './updates/services/updates/updates.service';

@Module({
  imports: [
    UserModule,
    ProjectsModule,
    PrismaModule,
    ProfileModule,
    QuestionsModule,
    UpdatesModule,
    DecisionsModule,
  ],
  controllers: [
    ProjectsController,
    UserController,
    ProfileController,
    DecisionsController,
    UpdatesController,
  ],
  providers: [
    AppService,
    UserService,
    ProjectsService,
    ProfileService,
    DecisionsService,
    UpdatesService,
  ],
})
export class AppModule {}
