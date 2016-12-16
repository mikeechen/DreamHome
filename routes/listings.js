'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/listings');
const jwt = require('jsonwebtoken');
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

router.post('/listings', authorize, ev(validations.post), (res, req, next) => {
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
      listBrokerName
        } = req.body;

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
              listBrokerName
            };
      if (match) {
        return knex('listings')
          .where('mls_number', mlsNumber)
          .where('id', match.id)
          .update(decamelizeKeys(row), *);
      } else {
        return knex('listings')
          .insert(decamelizeKeys(row), *);
      }
    })
    .then((everything) => {
      res.send(everything);
    })
    .catch((err) => {
      next(err);
    })
});

router.delete('/listings', authorize, ev(validations.delete), (res, req, next) => {
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
      next(err)
    })

})

module.exports = router;
