const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'postgres://docker:docker@pgdb:5432/task-er';

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Szalo' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/details', function(req, res, next) {
  pg.connect(connectionString, (err, client, done) => {
    const results = [];
    const query = client.query('SELECT * FROM items');

      if (err) {
        done();
        return res.status(500).json({success: false, data: err});
      }

      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        done();
        return res.json(results)
      });
  });
});

router.post('/api/tasks', (req, res, next) => {
  const results = [];

  // Grab data from HTTP request
  const data = {text: req.body.text, complete: false};

  // Get postgres client from connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection error
    if (err) {
      done();
      return res.status(500).json({success: false, data: err});
    }

    // SQL Query > Insert data
    client.query('INSERT INTO items(text, complete) values($1, $2)', [data.text, data.complete]);
    // SQL Query > Select data
    client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results
    query.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
module.exports = router;
