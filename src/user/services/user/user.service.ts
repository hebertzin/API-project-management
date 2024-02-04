import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers() {
    return 'all user';
  }

  getUserById(id: string) {
    return `hello ${id}`;
  }
}
