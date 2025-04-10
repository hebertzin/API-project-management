import { Module } from '@nestjs/common';
import { DecisionsController } from './controller/decisions.controller';
import { DecisionsService } from './services/decisions.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [DecisionsController],
  providers: [DecisionsService],
})
export class DecisionsModule {}
