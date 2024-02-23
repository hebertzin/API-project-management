import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UserService],
})
export class ProfileModule {}
