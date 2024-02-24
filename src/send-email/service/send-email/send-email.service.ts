import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { RESOURSE_NOT_FOUND } from 'src/helpers/helpers';

@Injectable()
export class SendEmailService {
  constructor(
    private sendEmailConfirmation: MailerService,
    private tokenEmail: JwtService,
    private prismaService: PrismaService,
  ) {}

  async sendEmailService(email: any): Promise<string> {
    const token = this.tokenEmail.sign({
      email,
    });

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
        throw new NotFoundException(RESOURSE_NOT_FOUND);
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
    }
  }
}
