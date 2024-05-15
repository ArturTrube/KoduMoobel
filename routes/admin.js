var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin-catalog');
});

router.get('/adding', function(req, res, next) {
  res.render('admin-adding');
});

router.get('/orders', function(req, res, next) {
  res.render('admin-orders');
});

module.exports = router;