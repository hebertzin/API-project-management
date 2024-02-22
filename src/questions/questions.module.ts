import { Module } from '@nestjs/common';
import { QuestionsController } from './controller/questions/questions.controller';
import { QuestionsService } from './services/questions/questions.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, UserService],
})
export class QuestionsModule {}
