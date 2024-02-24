import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth/auth.controller';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
