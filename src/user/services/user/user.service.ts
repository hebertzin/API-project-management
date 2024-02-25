import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TUser } from 'src/user/ultils/types';
import { User } from '@prisma/client';
import { SendEmailService } from 'src/send-email/service/send-email/send-email.service';
import {
  RESOURSE_NOT_FOUND,
  RESOURSE_ALREADY_EXIST,
} from 'src/helpers/helpers';
import { HashService } from 'src/hash/service/hash/hash.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private logger: LoggerService,
    private sendEmail: SendEmailService,
    private hash: HashService,
  ) {}

  async checkUserExistence(user_id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });

    this.logger.warn('user does not exist');
    if (!user) {
      throw new NotFoundException(RESOURSE_NOT_FOUND);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new NotFoundException(RESOURSE_ALREADY_EXIST);
    }

    return user;
  }

  async createUser(user: TUser): Promise<User> {
    await this.findUserByEmail(user.email);
    const hashPassword = await this.hash.generateHash(user.password);
    const createNewUser = await this.prismaService.user.create({
      data: {
        ...user,
        password: hashPassword,
      },
    });
    this.logger.log(
      'after the user creates an account, send an email to confirm the account',
    );
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
    this.logger.log('chek if user exist and if the user exists, update it');
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

  async findUserByIdAndDelete(user_id: string): Promise<void> {
    await this.checkUserExistence(user_id);
    await this.prismaService.user.delete({
      where: {
        id: user_id,
      },
    });
  }
}
