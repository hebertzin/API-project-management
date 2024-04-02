import { i18n } from 'src/i18n';
import { Exception } from './exception/exception.type';

export class ControllerCore {
  protected getMessage(message?: string, statusCode?: number): Exception {
    return {
      message: this.getDefaultMessage(message),
      statusCode: statusCode | 500,
    };
  }

  private getDefaultMessage(message?: string): string {
    return message || i18n()['message.ok'];
  }
}
