import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CONFIRM_EMAIL_TOKEN,
      signOptions: { expiresIn: '1d' },
    }),
    SharedServicesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
