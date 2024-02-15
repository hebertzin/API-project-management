import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profile } from 'src/profile/types/profile';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}
  async create(profileData: Profile) {
    const profile = await this.prismaService.prisma.profile.create({
      data: {
        ...profileData,
      },
    });
    return profile;
  }
  async getProfileById(profile_id: string) {
    const profile = await this.prismaService.prisma.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    return profile;
  }
  async findProfileByIdAndUpdate(profile_id: string, profileData: Profile) {
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
