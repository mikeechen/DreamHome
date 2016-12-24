// eslint-disable-next-line new-cap
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/token');
const { camelizeKeys } = require('humps');

function authorize(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.verify = false;
    } else {
      req.verify = true;
      req.token = decoded;
    }

    next();
  });
}

router.get('/api/token', authorize, (req, res, next) => {
  if (req.verify) {
    const { userId } = req.token;
    knex('users')
      .where('id', userId)
      .first()
      .then((row) => {
        if (!row) throw boom.create(400, 'User Doesn\'t exist!')
        const user = camelizeKeys(row);
        user.loggedIn = req.verify;
        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    const log = {
      loggedIn: req.verify
    };
    res.send(log);
  }
});

router.post('/api/token', ev(validations.post), (req, res, next) => {
  const { email, password } = req.body;
  let user;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      delete user.hashedPassword;

      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h'});

      res.cookie('token', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/api/token', (req, res, next) => {
  res.clearCookie('token');
  res.send(true);
});

module.exports = router;
