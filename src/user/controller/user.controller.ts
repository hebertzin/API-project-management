import {
  Body,
  Controller,
  Delete,
  Get,
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
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: i18n()['message.user.get'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findUserById(id);
    return res.status(200).json({
      msg: i18n()['message.user.get'],
      user,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.user.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user already exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async createUser(@Body() createUserDto: UserDto, @Res() res: Response) {
    const user = await this.userService.createUser(createUserDto);
    return res.json({
      msg: i18n()['message.user.created'],
      user,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.user.deleted'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.findUserByIdAndDelete(id);
    return res.json({
      msg: i18n()['message.user.deleted'],
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.user.update'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() editUserDTO: UserDto,
    @Res() res: Response,
  ) {
    const updateUser = await this.userService.findUserByIdAndUpdate(
      id,
      editUserDTO,
    );
    return res.json({
      msg: i18n()['message.user.update'],
      user: updateUser,
    });
  }

  @Post('/login')
  async login(@Body() email: string, password: string, @Res() res: Response) {
    const { token } = await this.userService.auth(email, password);

    return res.json({
      msg: i18n()['message.user.login'],
      token,
    });
  }
}
