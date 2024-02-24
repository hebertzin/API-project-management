import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './database/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { QuestionsModule } from './questions/questions.module';
import { UpdatesModule } from './updates/updates.module';
import { DecisionsModule } from './decisions/decisions.module';
import { CommentsModule } from './comments/comments.module';
import { GoalsModule } from './goals/goals.module';
import { TeamModule } from './team/team.module';
import { ProjectIdea } from './project-idea/project-idea.module';
import { FollowProjectModule } from './follow-project/follow-project.module';
import { EmailModule } from './email-service/email.module';
import { AuthModule } from './auth/auth.module';

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
    ProjectIdea,
    FollowProjectModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
