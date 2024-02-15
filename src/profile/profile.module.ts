import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, UserService],
})
export class ProfileModule {}
