import log from "electron-log";

export class DesktopLogger {
  setLevel(_level: string) {}

  setEnabled(_enabled: boolean) {}

  debug(...args: unknown[]) {
    log.debug(...args);
  }

  info(...args: unknown[]) {
    log.info(...args);
  }

  warn(...args: unknown[]) {
    log.warn(...args);
  }

  error(...args: unknown[]) {
    log.error(...args);
  }
}

export const logger = new DesktopLogger();
