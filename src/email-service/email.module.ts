import { Global, Module } from '@nestjs/common';
import { SendEmailService } from './service/send-email/send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';

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
  providers: [SendEmailService],
  exports: [SendEmailService],
})
export class EmailModule {}
