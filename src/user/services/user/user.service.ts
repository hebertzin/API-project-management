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
      throw new Error(`some error occurred creating a user : ${error}`);
    }
  }
  async getAllUser() {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      throw new Error(`some error occurred getting all users : ${error}`);
    }
  }
  async getUserById(id: number) {
    try {
      const userId = await this.userModel.findByPk(id);
      return userId;
    } catch (error) {
      throw new Error(`some error ocurred getting user by id : ${error}`);
    }
  }
  async deleteUser(id: number) {
    try {
      await this.userModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(`some error occurred deleting user : ${error}`);
    }
  }
  async updateUser(id: number, data: UserDetails) {
    try {
      const updateOne = await this.userModel.findOne({ where: { id: id } });
      if (!updateOne) {
        return {
          msg: 'user not found',
        };
      }
      return await updateOne.update({ ...data });
    } catch (error) {
      throw new Error(`some error occurred updating user : ${error}`);
    }
  }
}
