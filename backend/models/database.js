const pg = require('pg');
const connectionString = process.ENV.DATABASE_URL || 'postgres://docker:docker@//pgdb:5432/task-er';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });)
