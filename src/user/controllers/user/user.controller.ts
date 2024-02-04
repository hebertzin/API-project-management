import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @Delete('/:id')
  async deleteUserById(@Param('id') id: number, @Res() res: Response) {
    await this.userService.deleteUser(id);
    return res.status(200).json({
      msg: 'user deleted successfully',
    });
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updateUser = await this.userService.updateUser(id, data);
      return res.status(200).json({
        msg: 'user updated successfully',
        user: updateUser,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
