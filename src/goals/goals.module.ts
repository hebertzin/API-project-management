import { Module } from '@nestjs/common';
import { GoalsController } from './controller/goals/goals.controller';
import { GoalsService } from './services/goals/goals.service';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
