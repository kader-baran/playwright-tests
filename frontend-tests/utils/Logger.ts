import chalk from "chalk";

export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${level}] ${timestamp} - ${message}`;
  }

  static info(message: string): void {
    // eslint-disable-next-line no-console
    console.log(chalk.cyan(this.formatMessage("INFO", message)));
  }

  static warn(message: string): void {
    // eslint-disable-next-line no-console
    console.warn(chalk.yellow(this.formatMessage("WARN", message)));
  }

  static error(message: string): void {
    // eslint-disable-next-line no-console
    console.error(chalk.red(this.formatMessage("ERROR", message)));
  }
}
