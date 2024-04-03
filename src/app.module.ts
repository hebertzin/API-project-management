import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { EmailModule } from './send-email/email.module';
import { HashModule } from './hash/hash.module';
import { LoggerModule } from './logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskListProjectModule } from './task-list-project/task-list-project.module';
import { JwtMiddleware } from './middlewares/jwt-middleware';
import { AuthController } from './auth/controller/auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1d' },
    }),
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
    HashModule,
    LoggerModule,
    TaskListProjectModule,
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
