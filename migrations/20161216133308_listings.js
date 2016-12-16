'use strict';

exports.up = function(knex) {
  return knex.schema.table('listings', (table) => {
    table.float('lat');
    table.float('long');
  });
};

exports.down = function(knex) {
  return knex.schema.table('listings', (table) => {
    table.dropColumns('lat', 'long');
  });
};
