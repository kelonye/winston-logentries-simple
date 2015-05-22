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

logger.emitErrs = true;

logger.on('logging', function (transport, level, msg, meta) {
  console.log(msg);
  // process.exit();
});

logger.on('error', function (err) {
  throw err;
});

logger.info(process.env.LOG);

fn();

function fn(){
  setTimeout(function(){
    console.log('---->')
    fn();
  }, 1000);
}
