/**
  * Module dependencies.
  */
var net = require('net');
var util = require('util');
var winston = require('winston');


/**
  * Expose
  */
module.exports = Logentries;


/**
  * Simple logentries transport.
  *
  * @param {Object} opts - transport options
  */
function Logentries(opts){
  if (!(this instanceof Logentries)) return new Logentries(opts);
  winston.Transport.call(this, opts);
  opts = opts || {};
  this.level = opts.level || 'info';
  this.token = opts.token;
}


/**
  * Register logentries transport.
  */
winston.transports.Logentries = Logentries;


/**
  * Inherit from `winston.Transport.prototype`
  */
util.inherits(Logentries, winston.Transport);


/**
  * Expose transport name
  */
Logentries.prototype.name = 'logentries';


/**
  * Log
  *
  * @param {String} level - log level
  * @param {String} msg - log message
  * @param {Object} meta - log info
  * @param {Function} done - callback
  */
Logentries.prototype.log = function (level, msg, meta, done) {

  var self = this;
  var sock = net.createConnection(10000, 'api.logentries.com');
  sock.on('connect', onconnect);
  sock.on('error', onerror);
  sock.on('end', onend);

  function onconnect(){
    var date = new Date().toISOString();
    var event = [
      self.token,
      date,
      level,
      msg,
      '\n'
    ].join(' ');
    sock.write(event);
    sock.end();
  }

  function onerror(err){
    console.error(err);
    done(null, false);
  }

  function onend(err){
    done(null, true);
  }

};
