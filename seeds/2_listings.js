'use strict';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(() => {
      return knex('listings').insert([{
        id: 1,
        status: 'ACT',
        mls_number: '708562',
        address: '346 SW Butterfield Pl',
        city: 'Corvallis',
        state: 'OR',
        zip: '97333',
        price: '$66,000',
        beds: 2,
        baths: 2,
        sq_ft: 784,
        price_per_sq_ft: '$84.18',
        year_built: 1971,
        lot_sq_ft: 3920,
        garage_type: 'None',
        elementary_school: '509J',
        middle_school: '509J',
        high_school: '509J',
        list_date: new Date('8-10-2016'),
        photo: 'http://cdnparap70.paragonrels.com/ParagonImages/Property/P7/WVMLS/708562/0/60/45/6f4dde5028c54aa0effbe12f7bf54ad1/4/0302bd687cff7a61ad8758c2ef8fe928/708562.JPG',
        sale_rent: 'For Sale',
        list_broker_name: 'TODD N CLARK',
        lat: 44.544616,
        long: -123.2685,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('listings_id_seq', (SELECT MAX(id) FROM listings));"
      );
    });
};
