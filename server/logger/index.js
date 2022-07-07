const { transports, createLogger, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "filmly.log",
      level: "info",
      dirname: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
      dirname: "logs",
      format: format.combine(format.timestamp(), format.json(), format.json()),
    }),
  ],
});

module.exports = logger;
