import { Global, Module } from '@nestjs/common';
import { SendEmailService } from './service/send-email/send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './controller/email/email.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_SANDBOX,
        port: process.env.PORT_SANDBOX,
        secure: false,
        auth: {
          user: process.env.USER_SANDBOX,
          pass: process.env.PASSWORD_SANDBOX,
        },
        defaults: {
          from: process.env.DEFAULT_EMAIL,
        },
      },
    }),
  ],
  providers: [SendEmailService, JwtService, PrismaService],
  exports: [SendEmailService, JwtService],
  controllers: [EmailController],
})
export class EmailModule {}
