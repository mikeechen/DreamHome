'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const ev = require('express-validation');
const validations = require('../validations/favorites');
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

router.get('/favorites', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('favorites')
    .select('listings.id AS listings_id', '*')
    .innerJoin('listings', 'listings.id', 'favorites.listing_id')
    .where('favorites.user_id', userId)
    .orderBy('favorites.created_at', 'DESC')
    .then((data) => {
      const favorites = camelizeKeys(data);

      res.send(favorites);
    })
    .catc((err) => {
      next(err);
    });
});

router.get('/favorites/check', authorize, (req, res, next) => {
  const { userId } = req.token;
  const listingId = req.query.listingId;

  knex('favorites')
    .where('listing_id', listingId)
    .where('user_id', userId)
    .first()
    .then((data) => {
      if (data) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
    .catch((err) => {
      next(err);
    });
});

router.post('/favorites', authorize, ev(validations.post), (req, res, next) => {
  const { listingId } = req.body;
  const { userId } = req.token;

  knex('listings')
    .where('id', listingId)
    .first()
    .then((data) => {
      if (!data) throw boom.create(404, 'Listing Not Found!');

      return knex('favorites')
        .where('listing_id', listingId)
        .where('user_id', userId)
        .first();
    })
    .then((data) => {
      if (data) {
        throw boom.create(403, 'Already in Favorites!');
      } else {
        return knex('favorites').insert(decamelizeKeys({ listingId, userId }), '*');
      }
    })
    .then((data) => {
      res.send(camelizeKeys(data[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/favorites', authorize, ev(validations.post), (req, res, next) => {
  const { userId } = req.token;
  const { listingId } = req.body;

  let favorite;

  knex('favorites')
    .where('listing_id', listingId)
    .where('user_id', userId)
    .first()
    .then((row) => {
      if (!row) throw boom.create(404, 'Favorite does not Exist!');

      favorite = camelizeKeys(row);

      return knex('favorites')
        .where('listing_id', favorite.listingId)
        .where('user_id', favorite.userId)
        .del()
    })
    .then(() => {
      delete favorite.id;

      res.send(favorite);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
