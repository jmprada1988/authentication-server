const winston = require('winston');
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message} `)
);

const logger = winston.createLogger({
  transports: [   
    new winston.transports.Console(),
    new winston.transports.File({ filename: './assets/log.txt' })
  ]
});
winston.add(new winston.transports.Console(winston.format(logFormat)));
winston.add(new winston.transports.File({filename: './assets/log.txt', format: logFormat}))

module.exports = logger;
