var express = require('express');
var router = express.Router();

/* GET home page. */
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
  res.render('catalog');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/basket', function(req, res, next) {
  res.render('basket');
});

module.exports = router;
