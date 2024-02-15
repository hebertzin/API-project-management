import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profile } from 'src/profile/types/profile';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  private async checkProfileExistence(profile_id: string) {
    const profile = await this.prismaService.prisma.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    if (!profile) {
      throw new NotFoundException(`this profile ${profile_id} does not exist`);
    }
  }

  async createProfile(profileData: Profile) {
    await this.userService.checkUserExistence(profileData.userId);
    const profile = await this.prismaService.prisma.profile.create({
      data: {
        ...profileData,
      },
    });
    return profile;
  }

  async findProfileById(profile_id: string) {
    await this.checkProfileExistence(profile_id);
    const profile = await this.prismaService.prisma.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    return profile;
  }

  async findProfileByIdAndUpdate(profile_id: string, profileData: Profile) {
    await this.checkProfileExistence(profile_id);
    await this.userService.checkUserExistence(profileData.userId);
    const updateProfile = await this.prismaService.prisma.profile.update({
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
