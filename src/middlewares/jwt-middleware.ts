import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { i18n } from 'src/i18n';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: any, _res: any, next: () => void) {
    console.log(req);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new NotFoundException(i18n()['exception.tokenNotProvided']);
    }

    const decoded = this.jwtService.verify(token);

    if (!decoded) {
      throw new JsonWebTokenError(i18n()['exception.tokenMalformed']);
    }

    req.user = decoded;

    next();
  }
}
