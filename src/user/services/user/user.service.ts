import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/user/ultils/types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async checkUserExistence(user_id: string) {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
  }
  async createUser(user: User) {
    const createNewUser = await this.prismaService.prisma.user.create({
      data: {
        ...user,
      },
    });
    return createNewUser;
  }

  async findUserById(id: string) {
    await this.checkUserExistence(id);
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
