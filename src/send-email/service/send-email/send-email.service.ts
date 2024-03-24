import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { Errors } from 'src/helpers/errors';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class SendEmailService {
  constructor(
    private sendEmailConfirmation: MailerService,
    private tokenEmail: JwtService,
    private prismaService: PrismaService,
    private logger: LoggerService,
  ) {}

  async sendEmailService(email: any): Promise<string> {
    const token = this.tokenEmail.sign({
      email,
    });

    this.logger.log(`sending email to confirm account`);
    await this.sendEmailConfirmation.sendMail({
      to: email,
      subject: 'confirmation email',
      html: `link to confirm email : <a href="http://localhost:3333/email/confirm?token=${token}">click here</a>`,
    });

    return token;
  }

  async validate(token: any) {
    try {
      const decodedToken = await this.tokenEmail.verify(token, {
        secret: process.env.CONFIRM_EMAIL_TOKEN,
      });

      if (!decodedToken.email) {
        throw new Error('Invalid token structure');
      }

      const email = decodedToken.email;

      const user = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException(Errors.RESOURCE_NOT_FOUND);
      }

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailStatus: 'CONFIRMED',
        },
      });

      console.log('token decoded', decodedToken);
      return decodedToken;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('invalid token');
      }
      this.logger.error(`some error ocurred : ${error.message}`);
    }
  }
}
