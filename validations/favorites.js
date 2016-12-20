'use strict';

const joi = require('joi');

module.exports.post = {
  body: {
    listingId: joi.number()
      .integer()
      .min(1)
      .label('Listing Id')
      .required()
  }
};
