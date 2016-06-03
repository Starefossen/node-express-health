'use strict';

const HttpError = require('@starefossen/http-error');
const each = require('async-each-map');

module.exports = checks => {
  const services = checks instanceof Array ? checks : [checks];

  // check services
  services.forEach(service => {
    if (typeof service.check !== 'function') {
      throw new Error(`"${service.name}": check must be a function`);
    }
  });

  // return express / connect middleware
  return (req, res, next) => {
    each(services, (service, nextCheck) => {
      const name = service.name;

      // @TODO timeout for each / all service checks
      service.check((error, status) => {
        if (error) {
          nextCheck(new HttpError(`Service "${name}" returned error`, 500, error));
        } else {
          nextCheck(null, { name, status });
        }
      });
    }, (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(200);

        if (req.method === 'HEAD') {
          res.end();
        } else {
          res.json({
            code: 200,
            message: 'Ok',
            services: results,
          });
        }
      }
    });
  };
};

module.exports.middleware = module.exports([]);
