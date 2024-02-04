import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/userDto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDto, @Res() res: Response) {
    const newUser = await this.userService.createUser(user as any);
    return res.status(200).json({
      msg: 'user created successfully',
      user: newUser,
    });
  }
  @Get()
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    return res.status(200).json({
      msg: 'users found successfully',
      users,
    });
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    const userId = await this.userService.getUserById(id);
    return res.status(200).json({
      msg: 'userId found',
      users: userId,
    });
  }
}
