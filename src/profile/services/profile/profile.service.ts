import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TProfile } from 'src/profile/types/profile';
import { UserService } from 'src/user/services/user/user.service';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  private async checkProfileExistence(profile_id: string): Promise<Profile> {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    if (!profile) {
      throw new NotFoundException(`this profile ${profile_id} does not exist`);
    }
    return profile;
  }

  async createProfile(profileData: TProfile): Promise<Profile> {
    await this.userService.checkUserExistence(profileData.userId);
    const profile = await this.prismaService.profile.create({
      data: {
        ...profileData,
      },
    });
    return profile;
  }

  async findProfileById(profile_id: string): Promise<Profile | null> {
    await this.checkProfileExistence(profile_id);
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    return profile;
  }

  async findProfileByIdAndUpdate(
    profile_id: string,
    profileData: TProfile,
  ): Promise<Profile> {
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
  }
}
