import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  log(message: string) {
    super.log(message);
  }

  warn(message: string) {
    super.warn(message);
  }
}
