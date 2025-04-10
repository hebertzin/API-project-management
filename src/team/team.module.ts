import { Module } from '@nestjs/common';
import { TeamController } from './controller/team.controller';
import { TeamService } from './services/team.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
