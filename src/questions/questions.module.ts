import { Module } from '@nestjs/common';
import { QuestionsController } from './controller/questions/questions.controller';
import { QuestionsService } from './services/questions/questions.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, UserService, HashService],
})
export class QuestionsModule {}
