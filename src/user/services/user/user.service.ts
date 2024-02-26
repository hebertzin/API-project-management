import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TUser } from 'src/user/ultils/types';
import { User } from '@prisma/client';
import { SendEmailService } from 'src/send-email/service/send-email/send-email.service';
import { errors } from 'src/helpers/errors';
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
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(errors.userDoesNotExist);
      }

      throw new Error(
        `some error ocurred checking user existence : ${error.message}`,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        throw new ConflictException();
      }

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(errors.userAlreadyExist);
      }

      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async createUser(user: TUser): Promise<User> {
    try {
      await this.findUserByEmail(user.email);

      const hashPassword = await this.hash.generateHash(user.password);
      const createNewUser = await this.prismaService.user.create({
        data: {
          ...user,
          password: hashPassword,
        },
      });

      await this.sendEmail.sendEmailService(createNewUser.email);

      return createNewUser;
    } catch (error) {
      throw new Error(`some error ocurred : ${error.message}`);
    }
  }

  async findUserById(user_id: string): Promise<User | null> {
    try {
      await this.checkUserExistence(user_id);

      const userFound = await this.prismaService.user.findUnique({
        where: {
          id: user_id,
        },
      });

      return userFound;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findUserByIdAndUpdate(user_id: string, user: TUser): Promise<User> {
    try {
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
    } catch (error) {
      this.logger.error(`some error ocurring : ${error.message}`);
      throw error;
    }
  }

  async findUserByIdAndDelete(user_id: string): Promise<void> {
    try {
      await this.checkUserExistence(user_id);
      await this.prismaService.user.delete({
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      this.logger.error(`some error ocurred deleting user ${error.message}`);
      throw error;
    }
  }
}
