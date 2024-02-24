import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { UserService } from 'src/user/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() data: any, @Res() res: Response) {
    await this.userService.findUserByEmail(data.email);
    const token = await this.authService.generateToken(data.email);

    return res.status(200).json({
      msg: 'user login and generate token',
      token,
    });
  }
}
