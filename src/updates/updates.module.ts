import { Module } from '@nestjs/common';
import { UpdatesController } from './controller/updates.controller';
import { UpdatesService } from './services/updates.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
