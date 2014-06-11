/**
  * Module dependencies.
  */
var winston = require('winston');
var logentries = require('./');

// logger

winston.loggers.add('worker', {
  transports: [
    logentries({
      token: process.env.TOKEN
    }),
  ]
});

// log

var logger = winston.loggers.get('worker');
logger.info(process.env.LOG);
