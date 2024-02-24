import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendEmailService } from 'src/email-service/service/send-email/send-email.service';

@Controller('email')
export class EmailController {
  constructor(private sendEmailConfimation: SendEmailService) {}

  @Get('/confirm')
  async validateTokenEmail(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const isValidToken = await this.sendEmailConfimation.validate(token);
      return res.status(200).json({
        msg: 'Email confirmed',
        token: isValidToken,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
