import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsController } from './projects/controller/projects/projects.controller';
import { UserController } from './user/controller/user/user.controller';

@Module({
  imports: [],
  controllers: [ProjectsController, UserController],
  providers: [AppService],
})
export class AppModule {}
