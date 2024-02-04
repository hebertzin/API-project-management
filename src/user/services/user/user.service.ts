import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetails } from 'src/ultils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async createUser(user: UserDetails): Promise<User> {
    try {
      const userCreated = await this.userModel.create(user);

      return userCreated;
    } catch (error) {
      throw new Error('error creating user');
    }
  }
  async getAllUser() {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      throw new Error('error search users');
    }
  }
  async getUserById(id: number) {
    try {
      const userId = await this.userModel.findByPk(id);
      return userId;
    } catch (error) {
      throw new Error('error user id');
    }
  }
}
