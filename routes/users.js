var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); 

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

module.exports = router;
