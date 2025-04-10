import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { i18n } from 'src/i18n';
import { CreateProfileDTO } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/services/profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.profile.get'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id')
  async getProfile(@Param('id') profile_id: string, @Res() res: Response) {
    const profile = await this.profileService.findProfileById(profile_id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.profile.get'],
      data: { profile },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.profile.created'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post()
  async createProfle(
    @Body() createProfileDTO: CreateProfileDTO,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.createProfile(createProfileDTO);

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.profile.created'],
      data: { profile },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.profile.update'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Put(':id')
  async upateProfile(
    @Param('id') profile_id: string,
    @Body() updateProfile: CreateProfileDTO,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.findProfileByIdAndUpdate(
      profile_id,
      updateProfile,
    );
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.profile.update'],
      data: { profile },
    });
  }
}
