'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.integer('age').notNullable();
    table.string('phone_number', 10).notNullable().defaultTo('');
    table.specificType('hashed_password', 'char(60)')
     .notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
