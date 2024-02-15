import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profile } from 'src/profile/types/profile';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  private async checkProfileExistence(profile_id) {
    const profile = await this.prismaService.prisma.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    if (!profile) {
      throw new NotFoundException(`this profile ${profile_id} does not exist`);
    }
  }

  private async checkUserExistence(user_id: string) {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new NotFoundException(`this user ${user_id} does not exist`);
    }
  }

  async create(profileData: Profile) {
    await this.checkUserExistence(profileData.userId);
    const profile = await this.prismaService.prisma.profile.create({
      data: {
        ...profileData,
      },
    });
    return profile;
  }

  async getProfileById(profile_id: string) {
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
    await this.checkUserExistence(profileData.userId);
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
