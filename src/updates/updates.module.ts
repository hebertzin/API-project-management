import { Module } from '@nestjs/common';
import { UpdatesController } from './controller/updates/updates.controller';
import { UpdatesService } from './services/updates/updates.service';

@Module({
  controllers: [UpdatesController],
  providers: [UpdatesService]
})
export class UpdatesModule {}
