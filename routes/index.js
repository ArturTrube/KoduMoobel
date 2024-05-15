var express = require('express');
var router = express.Router();
const requireAuth = require('./checkRequest');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.get('/catalog', function(req, res, next) {
  const user = req.session.user;

  res.render('catalog', { user: user });
});

router.get('/profile', requireAuth('Client'), function(req, res, next) {
  res.render('profile');
});

router.get('/basket', requireAuth('Client'), function(req, res, next) {
  res.render('basket');
});

module.exports = router;
