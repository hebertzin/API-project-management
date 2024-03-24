import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TProfile } from 'src/profile/types/profile';
import { UserService } from 'src/user/services/user/user.service';
import { Profile } from '@prisma/client';
import { Errors } from 'src/helpers/errors';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  private async checkProfileExistence(profile_id: string): Promise<Profile> {
    try {
      const profile = await this.prismaService.profile.findUnique({
        where: {
          id: profile_id,
        },
      });
      if (!profile) {
        throw new NotFoundException();
      }

      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(Errors.RESOURCE_NOT_FOUND, profile_id);
      }
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async createProfile(profileData: TProfile): Promise<Profile> {
    try {
      await this.userService.checkUserExistence(profileData.userId);
      const profile = await this.prismaService.profile.create({
        data: {
          ...profileData,
        },
      });
      return profile;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findProfileById(profile_id: string): Promise<Profile | null> {
    try {
      await this.checkProfileExistence(profile_id);
      const profile = await this.prismaService.profile.findUnique({
        where: {
          id: profile_id,
        },
      });
      return profile;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }

  async findProfileByIdAndUpdate(
    profile_id: string,
    profileData: TProfile,
  ): Promise<Profile> {
    try {
      await this.checkProfileExistence(profile_id);
      await this.userService.checkUserExistence(profileData.userId);
      const updateProfile = await this.prismaService.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          ...profileData,
        },
      });
      return updateProfile;
    } catch (error) {
      this.logger.error(`some error ocurred : ${error.message}`);
      throw error;
    }
  }
}
