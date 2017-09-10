const config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
};

module.exports = require('knex')(config);
