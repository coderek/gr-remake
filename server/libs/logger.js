var winston = require('winston');

var serverLog = '../logs/server.log';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: serverLog})
    ]
});

module.exports = logger;