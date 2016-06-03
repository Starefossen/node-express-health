# @starefossen/express-health

[![Build status](https://app.wercker.com/status/725a775429b1e6c1fc395feda8a5a05d/s "wercker status")](https://app.wercker.com/project/bykey/725a775429b1e6c1fc395feda8a5a05d)
[![Codacy grade](https://img.shields.io/codacy/grade/1969f7ff739943c8907743150427c811.svg "Codac gradey")](https://www.codacy.com/app/starefossen/node-express-health)
[![Codacy coverage](https://img.shields.io/codacy/coverage/1969f7ff739943c8907743150427c811.svg "Codacy coverage")](https://www.codacy.com/app/starefossen/node-express-health)
[![NPM downloads](https://img.shields.io/npm/dm/@starefossen/express-health.svg "NPM downloads")](https://www.npmjs.com/package/@starefossen/express-health)
[![NPM version](https://img.shields.io/npm/v/@starefossen/express-health.svg "NPM version")](https://www.npmjs.com/package/@starefossen/express-health)
[![Node version](https://img.shields.io/node/v/@starefossen/express-health.svg "Node version")](https://www.npmjs.com/package/@starefossen/express-health)
[![Dependency status](https://img.shields.io/david/Starefossen/node-express-health.svg "Dependency status")](https://david-dm.org/Starefossen/node-express-health)

Health checking route for Express.js applications.

## Install

```
$ npm install @starefossen/express-health --save
```

## Usage

```js
const healthCheck = require('@starefossen/express-health');

### Single Check

```js
app.get('/healthCheck', healthCheck({
  name: 'Database',
  check: cb => {
    // get status from database
    db.getStatus(cb);
  },
}));
```

### Multiple Checks

```js
app.get('/healthChecks', healthCheck([{
  name: 'MongoDB',
  check: cb => {
    // get status from MongoDB database
    mongo.db.stats(cb);
  },
},{
  name: 'Redis',
  check: cb => {
    // get status from Redis cache
    redis.info(cb);
  },
}]));
```

## [MIT Licensed](https://github.com/Starefossen/node-express-health/blob/master/LICENSE)
