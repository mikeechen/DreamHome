'use strict';

const joi = require('joi');

module.exports = {
  post: {
    body: {
      status: joi.string()
        .trim()
        .label('Status')
        .required(),

      mlsNumber: joi.string()
        .trim()
        .label('MLS Number')
        .required(),

      address: joi.string()
        .trim()
        .label('Address')
        .required(),

      city: joi.string()
        .trim()
        .label('City')
        .required(),

      state: joi.string()
        .trim()
        .max(2)
        .label('State')
        .required(),

      zip: joi.string()
        .trim()
        .max(10)
        .label('Zip')
        .required(),

      price: joi.string()
        .trim()
        .label('Price')
        .required(),

      beds: joi.number()
        .max(100)
        .label('Beds')
        .required(),

      baths: joi.number()
        .max(100)
        .label('Baths')
        .required(),
      sqFt: joi.number()
        .label('Square Feet')
        .required(),

      pricePerSqFt: joi.string()
        .trim()
        .label('Price/sqft')
        .allow(''),

      yearBuilt: joi.number()
        .max(3000)
        .label('Yea Built')
        .required(),

      lotSqFt: joi.string()
        .trim()
        .label('Lot SqFt')
        .allow(''),

      garageType: joi.string()
        .trim()
        .label('Garage Type')
        .required(),

      elementarySchool: joi.string()
        .label('Elem School')
        .allow(''),

      middleSchool: joi.string()
        .label('Middle School')
        .allow(''),

      highSchool: joi.string()
        .label('High School')
        .allow(''),

      listDate: joi.date()
        .label('List Date')
        .required(),

      photo: joi.string()
        .label('Photo')
        .allow(''),

      saleRent: joi.string()
        .trim()
        .label('Sale Or Rent')
        .required(),

      listBrokerName: joi.string()
        .trim()
        .label('List Broker Name')
        .required(),

      remarks:joi.string()
        .label('Remarks')
        .allow('')
    }
  },

  delete: {
    body: {
      mlsNumber: joi.string()
      .trim()
      .label('MLS Number')
      .required()
    }
  },

  get: {
    body: {
      lat: joi.number()
      .label('Latitude')
      .required(),

      long: joi.number()
      .label('Longitude')
      .required(),

      dist: joi.number()
      .label('Distance')
      .required()
    }
  },

  getParam: {
    params: {
        id: joi.number()
          .integer()
          .min(0)
          .label('Id Param')
          .required()
    }
  }
};
