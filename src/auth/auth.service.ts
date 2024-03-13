import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    this.logger.log('chegou aqui');
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        request.user = decoded;
      } catch (error) {
        this.logger.error(`some error ocurred ${error.message}`);
        throw error;
      }
    }

    return next.handle();
  }
}
