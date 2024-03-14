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
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findUserById(id);
    return res.status(200).json({
      msg: 'user found successfully',
      user,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'User created successfully',
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
      msg: 'user created successfully',
      user,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
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
      msg: 'user delete successfully',
    });
  }

  // manutation in this part of project
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
      msg: 'user  successfully',
      user: updateUser,
    });
  }
}
