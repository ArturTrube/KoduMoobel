var express = require('express');
var router = express.Router();
const requireAuth = require('./checkRequest');
const Furniture = require('../models/Furniture');
const User = require('../models/User');
const Order = require('../models/Order');

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

router.get('/profile', requireAuth('Client'), async function(req, res, next) {
  try {
    const userEmail = req.session.user.email;
    const orders = await Order.find({ author: userEmail });

    res.render('profile', { email: userEmail, orders: orders });
  } catch (error) {
    console.error('Произошла ошибка при загрузке списка заказов:', error);
    res.status(500).json({ message: 'Произошла ошибка при загрузке списка заказов' });
  }
});

router.get('/basket', requireAuth('Client'), async function(req, res, next) {
  try {
    const user = await User.findOne({ email: req.session.user.email });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const userBasket = user.basket;

    const furniture = await Furniture.find({ _id: { $in: userBasket } });

    res.render('basket', { furniture: furniture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при загрузке корзины пользователя' });
  }
});

module.exports = router;
