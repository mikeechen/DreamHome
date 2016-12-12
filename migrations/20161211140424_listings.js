'use strict';
exports.up = function(knex) {
  return knex.schema.createTable('listings', (table) => {
    table.increments();
    table.string('status').notNullable().defaultTo('');
    table.string('mls_number').notNullable().defaultTo('').index();
    table.string('address').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state', 2).notNullable().defaultTo('');
    table.string('zip', 5).notNullable().defaultTo('');
    table.string('price').notNullable().defaultTo('');
    table.integer('beds').notNullable().defaultTo(0);
    table.integer('baths').notNullable().defaultTo(0);
    table.integer('sq_ft').notNullable().defaultTo(0);
    table.string('price_per_sq_ft').notNullable().defaultTo('');
    table.integer('year_built').notNullable().defaultTo(0);
    table.integer('lot_sq_ft').notNullable().defaultTo(0);
    table.string('garage_type').notNullable().defaultTo('');
    table.string('elementary_school').notNullable().defaultTo('');
    table.string('middle_school').notNullable().defaultTo('');
    table.string('high_school').notNullable().defaultTo('');
    table.date('list_date').notNullable().index();
    table.string('photo').notNullable().defaultTo('');
    table.string('sale_rent').notNullable().defaultTo('');
    table.string('list_broker_name').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('listings');
};
