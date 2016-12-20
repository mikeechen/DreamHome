'use strict';

exports.up = function(knex) {
  return knex.schema.table('listings', (table) => {
    table.string('lot_sq_ft').notNullable().defaultTo('');
    table.text('remarks').notNullable().defaultTo('');
    table.float('lat');
    table.float('long');
  });
};

exports.down = function(knex) {
  return knex.schema.table('listings', (table) => {
    table.dropColumns('lat', 'long', 'remarks', 'lot_sq_ft');
  });
};
