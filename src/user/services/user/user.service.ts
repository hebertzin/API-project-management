import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/ultils/types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User) {
    const createNewUser = await this.prismaService.prisma.user.create({
      data: {
        ...user,
      },
    });
    return createNewUser;
  }

  async findUserById(id: string) {
    const userFound = await this.prismaService.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return userFound;
  }
  async findUserByIdAndUpdate(id: string, user: User) {
    const userFound = await this.prismaService.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
    });
    return userFound;
  }
}
