var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var env = {
  AUTH0_CLIENT_ID:        process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN:           process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET:    process.env.AUTH0_CLIENT_SECRET,
  AUTH0_CALLBACK_URL:     process.env.AUTH0_CALLBACK_URL,
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {message: 'List of users'});
});

router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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
