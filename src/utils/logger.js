// const { createLogger, format, transports } = require('winston');

// const log = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'error.log', level: 'error' }),
//     new transports.File({ filename: 'combined.log' })
//   ]
// });

// log.info('This is an info message');
// log.error('This is an error message');

// module.exports = log;

const winston = require('winston');

const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

log.add(new winston.transports.Console({
    format: winston.format.simple(),
}));


module.exports = log;