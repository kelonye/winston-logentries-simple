
# winston-logentries-simple

  Simple logentries winston transport.

## Installation

    $ winston-logentries-simple

## Usage

```js

var winston = require('winston');
var logentries = require('winston-logentries-simple');

winston.loggers.add('app', {
  transports: [
    logentries({
      token: 'LOGENTRIES TOKEN'
    }),
  ]
});

var logger = winston.loggers.get('app');
logger.info('log');

```

### Example

    $ TOKEN='LOGENTRIES TOKEN' LOG='test' make

## License

MIT