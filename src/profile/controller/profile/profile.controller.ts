import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProfileDTO } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/services/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get()
  async getProfile(@Param('id') profile_id: string, @Res() res: Response) {
    const profile = await this.profileService.getProfileById(profile_id);

    return res.status(200).json({
      msg: 'profile found',
      profile,
    });
  }
  @Post()
  async createProfle(
    @Body() createProfileDTO: CreateProfileDTO,
    @Res() res: Response,
  ) {
    const createProfile = await this.profileService.create(createProfileDTO);

    return res.status(201).json({
      msg: 'profile created successfully',
      profile: createProfile,
    });
  }
}
