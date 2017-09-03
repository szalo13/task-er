var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {message: 'not logged in'});
});

router.post('/signup', function(req, res, next) {
  res.render('users', {message: 'Authenticated'});
});

module.exports = router;
