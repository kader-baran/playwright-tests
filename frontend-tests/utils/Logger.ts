export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${level}] ${timestamp} - ${message}`;
  }

  static info(message: string): void {
    // eslint-disable-next-line no-console
    console.log(this.formatMessage("INFO", message));
  }

  static warn(message: string): void {
    // eslint-disable-next-line no-console
    console.warn(this.formatMessage("WARN", message));
  }

  static error(message: string): void {
    // eslint-disable-next-line no-console
    console.error(this.formatMessage("ERROR", message));
  }
}
