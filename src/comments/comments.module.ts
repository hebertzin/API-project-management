import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { SharedServicesModule } from 'src/shared/shared-services.module';

@Module({
  imports: [SharedServicesModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
