import { Module } from '@nestjs/common';
import { DecisionsController } from './controller/decisions/decisions.controller';
import { DecisionsService } from './services/decisions/decisions.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DecisionsController],
  providers: [DecisionsService, PrismaService],
})
export class DecisionsModule {}
