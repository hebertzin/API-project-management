import { Module } from '@nestjs/common';
import { GoalsController } from './controller/goals.controller';
import { GoalsService } from './services/goals.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
