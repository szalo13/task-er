const express = require('express');
const router = express.Router();
const knex = require('../config/pgdb.js');

const data = {
  username: 'szalo15',
  email: 'kamil_sza@yahoo.pl',
  password: 'xxxxxx',
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.select().from('users')
  .then(function (users) {
    res.json(users);
  })
  .catch(function (err) {
    res.json(err);
  });
});

// Adding new user
router.get('/create', function(req, res, next) {
  knex('users').insert(data)
  .then(function () {
    res.json('done');
  })
  .catch(function (err) {
    res.json(err);
  })
});

module.exports = router;
