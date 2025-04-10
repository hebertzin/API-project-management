import {
  Body,
  Controller,
  Delete,
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
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.user.get'],
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
  async findUserById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const user = await this.userService.findUserById(id);
    return res.status(HttpStatus.OK).json({
      msg: i18n()['message.user.get'],
      data: { user },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.user.created'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : user already exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post()
  async createUser(
    @Body() createUserDto: UserDto,
    @Res() res: Response
  ) {
    const user = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      msg: i18n()['message.user.created'],
      data: { user },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.user.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.findUserByIdAndDelete(id);
    return res.status(HttpStatus.NO_CONTENT)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.user.update'],
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
  async updateUser(
    @Param('id') id: string,
    @Body() editUserDTO: UserDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findUserByIdAndUpdate(
      id,
      editUserDTO,
    );
    return res.json({
      msg: i18n()['message.user.update'],
      data: { user },
    });
  }

  @Post('/login')
  async login(
    @Body() email: string,
    password: string,
    @Res() res: Response
  ) {
    const { token } = await this.userService.auth(email, password);
    return res.status(HttpStatus.OK).json({
      msg: i18n()['message.user.login'],
      data: { token },
    });
  }
}
