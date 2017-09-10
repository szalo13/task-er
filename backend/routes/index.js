const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL;

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Szalo' });
});

module.exports = router;
