import { Module } from '@nestjs/common';
import { QuestionsController } from './controller/questions/questions.controller';
import { QuestionsService } from './services/questions.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
