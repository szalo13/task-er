exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('firstName');
    table.string('lastName');
    table.dateTime('birthday')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
