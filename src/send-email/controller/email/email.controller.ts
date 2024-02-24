import { Controller, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendEmailService } from 'src/send-email/service/send-email/send-email.service';

@Controller('email')
export class EmailController {
  constructor(private sendEmailConfimation: SendEmailService) {}

  @Post('/confirm')
  async validateTokenEmail(
    @Headers('authorization') authorization: any,
    @Res()
    res: Response,
  ) {
    try {
      const token = authorization.split(' ')[1];

      const decoded = await this.sendEmailConfimation.validate(token);

      return res.status(200).json({
        msg: 'Email confirmed',
        token: decoded,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
