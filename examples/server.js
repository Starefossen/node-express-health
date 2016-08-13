'use strict';

const express = require('express');
const healthCheck = require('../');

const app = module.exports = express();

// normal route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// simple health check
app.get('/simpleCheck', healthCheck.middleware);

// single health check
app.get('/healthCheck', healthCheck({
  name: 'my service',
  check: cb => {
    cb(null, 'Service Ok');
  },
}));

// multiple health checks
app.get('/healthChecks', healthCheck([{
  name: 'db',
  check: cb => {
    cb(null, 'Database Ok');
  },
}, {
  name: 'cache',
  check: cb => {
    cb(null, 'Cache Ok');
  },
}]));

// health check with error
app.get('/healthCheckError', healthCheck([{
  name: 'db',
  check: cb => {
    cb(null, 'Database Ok');
  },
}, {
  name: 'cache',
  check: cb => {
    cb(new Error('Could not connect to cache'));
  },
}]));

// handle cors errors
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.code).send(err.toJSON());
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000'); // eslint-disable-line no-console
}
