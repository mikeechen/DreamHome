'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('listing_id')
      .notNullable()
      .references('id')
      .inTable('listings')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
