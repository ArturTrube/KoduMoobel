var express = require('express');
var router = express.Router();
const requireAuth = require('./checkRequest');
const Furniture = require('../models/Furniture');
const User = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.get('/catalog', async function(req, res, next) {
  try {
    var user = await User.findOne({email: req.session.user.email});
  } catch (error) {
    user = null
  }
  try {
    const furniture = await Furniture.find();

    res.render('catalog', { user: user, furniture: furniture }  );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Произошла ошибка при загрузке мебели' });
  }
});

router.get('/profile', requireAuth('Client'), function(req, res, next) {
  res.render('profile');
});

router.get('/basket', requireAuth('Client'), function(req, res, next) {
  res.render('basket');
});

module.exports = router;
