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

  async sendEmailService(email: string): Promise<void | string> {
    const token = this.tokenEmail.sign(email);

    await this.sendEmailConfirmation.sendMail({
      to: email,
      subject: 'confirmation email',
      html: `link to confirm email : <a href="http://localhost:3333/email/confirm?token=${token}">click here</a>`,
    });
    return token.toString();
  }

  async validate(token: any) {
    try {
      const isValidToken = await this.tokenEmail.verify(token);

      if (isValidToken) {
        const email = isValidToken.email;

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
      }

      return isValidToken;
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
