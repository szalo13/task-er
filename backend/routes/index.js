const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'postgres://docker:docker@pgdb:5432/task-er';
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/users');
  }
);

module.exports = router;
