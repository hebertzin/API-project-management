import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TUser } from 'src/user/ultils/types';
import { User } from '@prisma/client';
import { SendEmailService } from 'src/email-service/service/send-email/send-email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendEmail: SendEmailService,
  ) {}

  async checkUserExistence(user_id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'this user does not exist create an account please',
      );
    }

    return user;
  }

  async createUser(user: TUser): Promise<User> {
    const createNewUser = await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
    await this.sendEmail.sendEmailService(createNewUser.email);
    return createNewUser;
  }

  async findUserById(user_id: string): Promise<User | null> {
    await this.checkUserExistence(user_id);
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });
    return userFound;
  }
  async findUserByIdAndUpdate(user_id: string, user: TUser): Promise<User> {
    await this.checkUserExistence(user_id);
    const userFound = await this.prismaService.user.update({
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
