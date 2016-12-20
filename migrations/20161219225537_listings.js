'use strict';
exports.up = function(knex) {
  return knex.schema.raw('ALTER TABLE listings ADD COLUMN geo geography(point, 4326)');
};

exports.down = function(knex) {
  return knex.schema.raw('ALTER TABLE listings DROP COLUMN geo');
};
