import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async disconnect() {
    await this.$on('beforeExist' as never, async (app: any) => {
      await app.close;
    });
  }
}
