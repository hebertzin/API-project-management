import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService {
  constructor(private readonly sendEmailConfirmation: MailerService) {}
  async sendEmailService(email: string): Promise<void> {
    return await this.sendEmailConfirmation.sendMail({
      to: email,
      subject: 'confirmation email',
      html: `link to confirm email : <a href="http://seuapp.com/auth/confirm">click here</a>`,
    });
  }
}
