var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const requireAuth = require('./checkRequest');
const User = require('../models/User'); 
const Order = require('../models/Order');

router.post('/login', async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Неправильные учетные данные' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неправильные учетные данные' });
    }

    req.session.user = user;

    res.status(200).json({ message: 'Успешная авторизация', type: user.type});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при авторизации' });
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

router.post('/registration', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const adminUser = await User.findOne({ email: 'admin' });
    const hashedAdminPassword = await bcrypt.hash('123', 10);
    if(!adminUser){
      const adminUser = new User({
        email: 'admin',
        password: hashedAdminPassword,
        type: 'Admin'
      });
      await adminUser.save();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      type: 'Client'
    });

    await newUser.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя' });
  }
});

router.post('/add-to-basket', async (req, res) => {
  try {
      const { itemId } = req.body;
      const user = req.session.user;
      
      if (!user) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
      }
      
      const foundUser = await User.findById(user._id);

      if (!foundUser) {
          return res.status(404).json({ message: 'Пользователь не найден' });
      }

      foundUser.basket.push(itemId);
      await foundUser.save();

      res.status(200).json({ message: 'Товар успешно добавлен в корзину' });
  } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении товара в корзину' });
  }
});

router.post('/remove-from-basket', async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = req.session.user;
    
    if (!user) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    
    const foundUser = await User.findById(user._id);
    
    if (!foundUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const index = foundUser.basket.indexOf(itemId);
    if (index !== -1) {
      foundUser.basket.splice(index, 1);
    }

    await foundUser.save();

    res.status(200).json({ message: 'Товар успешно удален из корзины' });
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении товара из корзины' });
  }
});

router.post('/checkout', async (req, res) => {
  try {
    const { address, contact, furniture, total } = req.body;
    const author = req.session.user.email;
    const number = generateOrderNumber();

    const newOrder = new Order({
      number: number,
      author: author,
      address: address,
      total: total,
      contact: contact,
      status: 'Неоплачено',
      furniture: furniture
    });

    await newOrder.save();

    const user = await User.findOne({ email: author });
    user.basket = [];
    await user.save();

    res.status(200).json({ message: 'Заказ успешно оформлен' });
  } catch (error) {
    console.error('Произошла ошибка при оформлении заказа:', error);
    res.status(500).json({ message: 'Произошла ошибка при оформлении заказа' });
  }
});

function generateOrderNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

router.post('/delete-order', async (req, res) => {
  try {
    const { orderId } = req.body;

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: 'Заказ успешно удален' });
  } catch (error) {
    console.error('Произошла ошибка при удалении заказа:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении заказа' });
  }
});


module.exports = router;
