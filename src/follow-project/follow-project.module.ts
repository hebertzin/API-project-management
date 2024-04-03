import { Module } from '@nestjs/common';
import { FollowProjectService } from './service/follow-project/follow-project.service';
import { FollowProjectController } from './controller/follow-project/follow-project.controller';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  providers: [FollowProjectService],
  controllers: [FollowProjectController],
})
export class FollowProjectModule {}
