import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { SendEmailService } from 'src/send-email/service/send-email/send-email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, SendEmailService],
  exports: [UserService],
})
export class UserModule {}
