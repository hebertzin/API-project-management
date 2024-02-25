import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { SendEmailService } from 'src/send-email/service/send-email/send-email.service';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from 'src/hash/service/hash/hash.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CONFIRM_EMAIL_TOKEN,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, SendEmailService, HashService],
  exports: [UserService],
})
export class UserModule {}
