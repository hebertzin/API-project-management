import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { UserService } from 'src/user/services/user/user.service';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UserService, HashService],
})
export class ProfileModule {}
