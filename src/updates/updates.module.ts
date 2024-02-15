import { Module } from '@nestjs/common';
import { UpdatesController } from './controller/updates/updates.controller';
import { UpdatesService } from './services/updates/updates.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UpdatesController],
  providers: [UpdatesService, PrismaService],
})
export class UpdatesModule {}
