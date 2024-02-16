import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TUser } from 'src/user/ultils/types';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async checkUserExistence(user_id: string): Promise<User | null> {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
    return user;
  }
  async createUser(user: TUser): Promise<User> {
    const createNewUser = await this.prismaService.prisma.user.create({
      data: {
        ...user,
      },
    });
    return createNewUser;
  }

  async findUserById(user_id: string): Promise<User | null> {
    await this.checkUserExistence(user_id);
    const userFound = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    return userFound;
  }
  async findUserByIdAndUpdate(user_id: string, user: TUser): Promise<User> {
    await this.checkUserExistence(user_id);
    const userFound = await this.prismaService.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...user,
      },
    });
    return userFound;
  }
}
