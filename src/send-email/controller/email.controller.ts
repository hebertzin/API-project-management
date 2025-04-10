import { Controller, Headers, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SendEmailService } from 'src/send-email/service/send-email.service';

@ApiTags('confirm-account')
@Controller('email')
export class EmailController {
  constructor(private sendEmailConfimation: SendEmailService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmed email',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : Token expired or invalid token',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post('confirm')
  async validateTokenEmail(
    @Headers('authorization') authorization: any,
    @Res()
    res: Response,
  ) {
    try {
      const token = authorization.split(' ')[1];

      const decoded = await this.sendEmailConfimation.validate(token);

      return res.status(HttpStatus.OK).json({
        message: 'Email confirmed',
        data: { decoded },
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }
}
