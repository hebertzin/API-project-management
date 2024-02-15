import { Module } from '@nestjs/common';
import { DecisionsController } from './controller/decisions/decisions.controller';
import { DecisionsService } from './services/decisions/decisions.service';

@Module({
  controllers: [DecisionsController],
  providers: [DecisionsService],
})
export class DecisionsModule {}
