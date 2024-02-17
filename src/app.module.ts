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
import { CommentsModule } from './comments/comments.module';
import { CommentsController } from './comments/controller/comments/comments.controller';
import { CommentsService } from './comments/services/comments/comments.service';
import { GoalsModule } from './goals/goals.module';
import { GoalsController } from './goals/controller/goals/goals.controller';
import { GoalsService } from './goals/services/goals/goals.service';
import { TeamModule } from './team/team.module';
import { TeamController } from './team/controller/team/team.controller';
import { TeamService } from './team/services/team/team.service';

@Module({
  imports: [
    UserModule,
    ProjectsModule,
    PrismaModule,
    ProfileModule,
    QuestionsModule,
    UpdatesModule,
    DecisionsModule,
    CommentsModule,
    GoalsModule,
    TeamModule,
  ],
  controllers: [
    ProjectsController,
    UserController,
    ProfileController,
    DecisionsController,
    UpdatesController,
    CommentsController,
    GoalsController,
    TeamController,
  ],
  providers: [
    AppService,
    UserService,
    ProjectsService,
    ProfileService,
    DecisionsService,
    UpdatesService,
    CommentsService,
    GoalsService,
    TeamService,
  ],
})
export class AppModule {}
