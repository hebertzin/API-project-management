import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/auth/types/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: Payload) {
    const token = this.jwtService.sign({ data: payload });
    return token;
  }
}
