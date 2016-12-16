'use strict';

const joi = require('joi');

module.exports.post = {
  body: {
    firstName: joi.string()
      .trim()
      .max(30)
      .label('First name')
      .required(),

    lastName: joi.string()
      .trim()
      .max(30)
      .label('Last name')
      .required(),

    email: joi.string()
      .email()
      .trim()
      .max(50)
      .label('Email')
      .required(),

    age: joi.number()
      .integer()
      .positive()
      .label('Age')
      .required(),

    phoneNumber: joi.string()
      .trim()
      .min(10)
      .max(10)
      .label('Phone Number')
      .required(),

    password: joi.string()
      .min(10)
      .label('Password')
      .required()
  }
};
