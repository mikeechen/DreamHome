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

router.post('/favorites', authorize, (req, res, next) => {
  
});

module.exports = router;
