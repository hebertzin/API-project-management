import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { databaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [UserModule, SequelizeModule.forRoot(databaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
