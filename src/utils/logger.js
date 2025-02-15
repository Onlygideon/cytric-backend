import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
      const { timestamp, level, message, meta } = info;
      const req = meta && meta.req;
      const res = meta && meta.res;
      const requestId = req && req.id;
      const statusCode = res && res.statusCode;
      const durationMs = meta && meta.durationMs;

      const logMessage = `${timestamp} [${level}] ${requestId ? `[${requestId}] ` : ""}${message} ${
        req ? `(${req.method} ${req.originalUrl})` : ""
      } ${statusCode ? `status=${statusCode}` : ""} ${
        durationMs ? `durationMs=${durationMs}` : ""
      }`;

      return logMessage;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

const logFunctions = {
  info: (message, ...extraMessages) => {
    logger.info(message, extraMessages);
  },

  error: async (message) => {
    logger.error(message);
  },

  warn: (message) => {
    logger.warn(message);
  },
};

export default logFunctions;
