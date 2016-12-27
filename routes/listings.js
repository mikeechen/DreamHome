'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/listings');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const st = require('knex-postgis')(knex);
const { camelizeKeys, decamelizeKeys } = require('humps');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.userId !== 1) {
      res.verify = false;

      return next(boom.create(401, 'Unauthorized'));
    }

    res.verify = true;
    req.token = decoded;

    next();
  });
};

router.get('/api/listings/reb', (req, res, next) => {
  knex('listings')
    .where('list_broker_name', 'REBECCA YU')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    })
});

router.get('/api/listings/:id', ev(validations.getParam), (req, res, next) => {
  const id = req.params.id;
  knex('listings')
    .where('id', id)
    .first()
    .then((house) => {
      if (!house) {
        throw boom.create(404, 'Property not Found!')
      }
      res.send(house);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/api/listings/get', ev(validations.get), (req, res, next) => {
  const { lat, long, dist } = req.body;

  knex('listings')
  .where(st.dwithin('geo', st.makePoint(long, lat), dist))
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/api/listings', authorize, ev(validations.post), (req, res, next) => {
  const {
      status,
      mlsNumber,
      address,
      city,
      state,
      zip,
      price,
      beds,
      baths,
      sqFt,
      pricePerSqFt,
      yearBuilt,
      lotSqFt,
      garageType,
      elementarySchool,
      middleSchool,
      highSchool,
      listDate,
      photo,
      saleRent,
      listBrokerName,
      remarks
        } = req.body;

  const options = {
    uri: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      key: 'AIzaSyATgzqn8BcKW5zFR4Lm6hOMnIpBVVyutko',
      address: `${address},+${city},+${state},+${zip}`
    },
    json: true
  }

  knex('listings')
    .where('mls_number', mlsNumber)
    .first()
    .then((match) => {
      const row = {
              status,
              mlsNumber,
              address,
              city,
              state,
              zip,
              price,
              beds,
              baths,
              sqFt,
              pricePerSqFt,
              yearBuilt,
              lotSqFt,
              garageType,
              elementarySchool,
              middleSchool,
              highSchool,
              listDate,
              photo,
              saleRent,
              listBrokerName,
              remarks
            };
      if (match) {
        return knex('listings')
          .where('mls_number', mlsNumber)
          .where('id', match.id)
          .update(decamelizeKeys(row), '*');
      } else if (status === 'ACT' || status === 'ACTUC' || status === 'ACTRR' || status === 'PND') {
        rp(options)
          .then((data) => {
            const results = data.results[0].geometry.location;
            row.lat = results.lat;
            row.long = results.lng;
            return knex('listings')
              .insert(Object.assign(decamelizeKeys(row), {geo: st.makePoint(row.long, row.lat)}), '*');
          });
      } else {
        res.send('Unecessary Addition');
      }
    })
    .then((everything) => {
      res.send(camelizeKeys(everything));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/api/listings', authorize, ev(validations.delete), (req, res, next) => {
  const { mlsNumber } = req.body;

  knex('listings')
    .where('mls_number', mlsNumber)
    .then((row) => {
      if (!row) {
        throw boom.create(400, `${mlsNumber} doesn't seem to exist!`);
      }

      return knex('listings')
        .where('mls_number', mlsNumber)
        .where('id', row.id)
        .del();
    })
    .then((deleted) => {
      delete deleted.id;
      res.send(deleted);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
