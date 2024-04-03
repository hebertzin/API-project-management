import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: any, _res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new NotFoundException('Token não encontrado na requição');
    }

    const decoded = this.jwtService.verify(token);
    req.user = decoded;

    next();
  }
}
