import { Logger } from './Logger';

function okMessage(From: string, Message: string): string {
  return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[32m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function warnMessage(From: string, Message: string): string {
  return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[33m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function infoMessage(From: string, Message: string): string {
  return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[34m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function errMessage(From: string, Message: string): string {
  return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[31m\x1b[1m${From}\x1b[0m] ${Message}\x1b[0m`;
}

export class consoleLogger implements Logger {
  private readonly identifier: string;
  constructor(identifier: string) {
    this.identifier = identifier;
  }

  success(message: string): void {
    console.log(okMessage(this.identifier, message));
  }
  warning(message: string): void {
    console.warn(warnMessage(this.identifier, message));
  }
  info(message: string): void {
    console.info(infoMessage(this.identifier, message));
  }
  error(message: string): void {
    console.error(errMessage(this.identifier, message));
  }
}
