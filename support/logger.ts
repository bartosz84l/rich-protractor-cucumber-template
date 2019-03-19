import  * as  winston from 'winston';
import { createLogger, format } from 'winston';

const level = process.env.LOG_LEVEL || 'debug';
const colorizer = winston.format.colorize();
const myFormat = format.printf(
    info => colorizer.colorize(info.level, `${info.timestamp} [${info.level}] [${info.label}]: `) + info.message)

const logger = createLogger({
    level: level,
    format: format.combine(
        // format.timestamp({
        //     format: 'YYYY-MM-DD HH:mm:ss'
        // }),
        format.simple(),
        // myFormat,
    ),
    transports: [
        new winston.transports.File({ filename: '.tmp/test.log', level: 'debug' }),
        new winston.transports.Console()
    ]
});

function elementToString (el) {
    var output = '',
        locator = el ? el.locator() : {
            using: 'ERROR',
            value: 'Undefined element'
        };
    output += locator.using + ':\'' + locator.value + '\'';
    return output;
};


export {
    logger,
    elementToString
}