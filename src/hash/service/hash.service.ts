import { Injectable } from '@nestjs/common';
import * as crypto from 'bcrypt';

@Injectable()
export class HashService {
  async generateHash(password: string) {
    try {
      const hash = await crypto.hash(password, 10);
      return hash;
    } catch (error) {
      return error;
    }
  }

  async compare(password: string, password_hash: string) {
    const compare = await crypto.compare(password, password_hash);

    return compare;
  }
}
