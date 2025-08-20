import winston from "winston";
import path from "path";

// Get log directory from environment variable or use default
const logDir = process.env.LOG_DIR || "logs";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Use LOG_LEVEL from env or default to 'info'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Error log file - use LOG_ERROR_FILE from env or default path
    new winston.transports.File({
      filename: process.env.LOG_ERROR_FILE || path.join(logDir, "error.log"),
      level: "error",
    }),
    // Combined log file - use LOG_FILE from env or default path
    new winston.transports.File({
      filename: process.env.LOG_FILE || path.join(logDir, "combined.log"),
    }),
  ],
});

// Add console transport for non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
