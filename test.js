'use strict';

const request = require('supertest');
const simpleApp = request(require('./examples/server'));

describe('examples', () => {
  describe('server', () => {
    it('single check', done => {
      simpleApp.get('/healthCheck')
        .expect(200)
        .expect({
          code: 200,
          message: 'Ok',
          services: [{
            name: 'my service',
            status: 'Service Ok',
          }],
        }, done);
    });

    it('multiple checks', done => {
      simpleApp.get('/healthChecks')
        .expect(200)
        .expect({
          code: 200,
          message: 'Ok',
          services: [{
            name: 'db',
            status: 'Database Ok',
          }, {
            name: 'cache',
            status: 'Cache Ok',
          }],
        }, done);
    });

    it('health check error', done => {
      simpleApp.get('/healthCheckError')
        .expect(500)
        .expect({
          code: 500,
          message: 'Service "cache" returned error',
        }, done);
    });
  });
});
