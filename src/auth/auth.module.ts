import { Module } from '@nestjs/common';
import { JwtInterceptor } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtInterceptor, JwtService],
  controllers: [],
})
export class AuthModule {}
