import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findUserById(id);
    return res.status(200).json({
      msg: 'user found successfully',
      user,
    });
  }

  @Post('')
  async createUser(@Body() createUserDto: UserDto, @Res() res: Response) {
    const user = await this.userService.createUser(createUserDto);
    return res.json({
      msg: 'user created successfully',
      user,
    });
  }

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
      msg: 'user created successfully',
      user: updateUser,
    });
  }
}
