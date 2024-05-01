import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const logsDir = join(__dirname, "../logs");

if (!existsSync(logsDir)) {
  mkdirSync(logsDir);
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-D HH-mm-ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "debug",
      maxFiles: 30,
      dirname: logsDir + "/debug",
      filename: `%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      json: false,
      zippedArchive: true,
    }),

    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxFiles: 30,
      dirname: logsDir + "/error",
      filename: `%DATE%.log`,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize()
    ),
  })
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};

export { logger, stream };
