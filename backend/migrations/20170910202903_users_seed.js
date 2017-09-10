
exports.up = function(knex, Promise) {
  return knex.schema.raw(`
    INSERT INTO "public"."users"
    ("username", "email", "password")
    VALUES('szalo13', 'kamil_sza@o2.pl', '12345')
    RETURNING "id", "username", "email", "password", "firstName", "lastName", "birthday", "created_at";
    `);
  }

exports.down = function(knex, Promise) {
  knex.raw('delete * from users;')
};
