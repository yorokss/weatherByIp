const winston = require('winston');

// Define a custom format to avoid logging sensitive data (like raw IP addresses)
const customFormat = winston.format.combine(
  winston.format.timestamp(), // Add a timestamp to logs
  winston.format.json(), // Log messages in JSON format for easy parsing
  winston.format((info) => {
    // Redact sensitive data (example: raw IP addresses)
    if (info.message && typeof info.message === 'object' && info.message.ip) {
      info.message.ip = '[REDACTED]';
    }
    return info;
  })()
);

const logger = winston.createLogger({
  level: 'info', // Set default logging level
  format: customFormat, // Apply the custom format
  defaultMeta: { service: 'weather-api-service' }, // Adjust the service name
  transports: [
    // Write error logs to error.log
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Write all logs to combined.log
    new winston.transports.File({ filename: 'combined.log' }),
    // Optional: Console transport for easier debugging during development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors for console output
        winston.format.simple() // Simpler format for console
      ),
    }),
  ],
});

// Custom function for structured logging
logger.infoWithMeta = (message, meta = {}) => {
  logger.info({ message, ...meta });
};

logger.errorWithMeta = (message, meta = {}) => {
  logger.error({ message, ...meta });
};

module.exports = logger;
