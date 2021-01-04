import winston from "winston";
import path from "path";
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      dirname: path.join(path.dirname(__dirname), "/logs"),
    }),
    // new winston.transports.File({
    //   filename: "combined.log",
    //   level: "info",
    //   dirname: path.join(path.dirname(__dirname), "/logs"),
    // }),
  ],
});
