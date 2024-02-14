import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
}
