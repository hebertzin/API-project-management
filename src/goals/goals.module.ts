import { Module } from '@nestjs/common';
import { GoalsController } from './controller/goals/goals.controller';
import { GoalsService } from './services/goals/goals.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
