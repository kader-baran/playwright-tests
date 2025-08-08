import chalk from "chalk";

type LogLevel = "silent" | "error" | "warn" | "info";

export class Logger {
  private static currentLevel: LogLevel =
    (process.env.LOG_LEVEL as LogLevel) || "info";
  static enableBodies: boolean = process.env.LOG_BODY === "1";

  private static passesLevel(level: LogLevel): boolean {
    const order: Record<LogLevel, number> = {
      silent: 0,
      error: 1,
      warn: 2,
      info: 3,
    };
    return order[level] <= order[Logger.currentLevel];
  }

  static setLevel(level: LogLevel): void {
    Logger.currentLevel = level;
  }

  private static format(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    const formatted = `[${level}] ${timestamp} - ${message}`;
    switch (level) {
      case "INFO":
        return chalk.cyan(formatted);
      case "WARN":
        return chalk.yellow(formatted);
      case "ERROR":
        return chalk.red(formatted);
      default:
        return formatted;
    }
  }

  static colorMethod(method: string): string {
    const upper = method.toUpperCase();
    switch (upper) {
      case "GET":
        return chalk.blue(upper);
      case "POST":
        return chalk.green(upper);
      case "PUT":
        return chalk.magenta(upper);
      case "DELETE":
        return chalk.red(upper);
      default:
        return chalk.white(upper);
    }
  }

  static colorStatus(status: number): string {
    if (status >= 200 && status < 300) return chalk.green(`${status}`);
    if (status >= 300 && status < 400) return chalk.cyan(`${status}`);
    if (status >= 400 && status < 500) return chalk.yellow(`${status}`);
    return chalk.red(`${status}`);
  }

  static stringify(value: unknown, maxLength: number = 400): string {
    try {
      const json = typeof value === "string" ? value : JSON.stringify(value);
      if (!json) return "";
      return json.length > maxLength ? json.slice(0, maxLength) + "…" : json;
    } catch {
      return String(value);
    }
  }

  static info(message: string): void {
    if (!Logger.passesLevel("info")) return;
    console.log(Logger.format("INFO", message));
  }

  static warn(message: string): void {
    if (!Logger.passesLevel("warn")) return;
    console.warn(Logger.format("WARN", message));
  }

  static error(message: string): void {
    if (!Logger.passesLevel("error")) return;
    console.error(Logger.format("ERROR", message));
  }
}
