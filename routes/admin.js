var express = require('express');
var router = express.Router();
const multer = require('multer');
const requireAuth = require('./checkRequest');
const Furniture = require('../models/Furniture');
const Order = require('../models/Order');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', requireAuth('Admin'), async function(req, res, next) {
  try {
    var user = await User.findOne({email: req.session.user.email});
  } catch (error) {
    user = null
  }
  try {
    const furniture = await Furniture.find();

    res.render('admin-catalog', { user: user, furniture: furniture }  );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Произошла ошибка при загрузке мебели' });
  }
});

router.get('/adding', requireAuth('Admin'), function(req, res, next) {
  res.render('admin-adding');
});

router.get('/orders', requireAuth('Admin'), async function(req, res, next) {
  try {
    const orders = await Order.find();

    res.render('admin-orders', { orders: orders });
  } catch (error) {
    console.error('Произошла ошибка при загрузке списка заказов:', error);
    res.status(500).json({ message: 'Произошла ошибка при загрузке списка заказов' });
  }
});

router.post('/add-furniture', requireAuth('Admin'), upload.single('photo'), async function(req, res) {
  try {
    const { title, price, description, type } = req.body;
    const photoLink = req.file.filename;

    const newFurniture = new Furniture({
      title: title,
      price: price,
      description: description,
      type: type,
      photoLink: photoLink
    });

    await newFurniture.save();

    res.status(201).json({ message: 'Мебель успешно добавлена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка при добавлении мебели' });
  }
});

router.post('/delete-furniture', requireAuth('Admin'), async function(req, res) {
  try {
    const { id } = req.body;

    await Furniture.findByIdAndDelete(id);

    res.status(200).json({ message: 'Мебель успешно удалена' });
  } catch (error) {
    console.error('Произошла ошибка при удалении мебели:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении мебели' });
  }
});

router.post('/update-order-status', requireAuth('Admin'), async function(req, res) {
  try {
    const { orderId, newStatus } = req.body;

    const foundOrder = await Order.findById(orderId);

    if (!foundOrder) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    foundOrder.status = newStatus;

    await foundOrder.save();

    res.status(200).json({ message: `Статус заказа ${orderId} успешно обновлен` });
  } catch (error) {
    console.error('Произошла ошибка при обновлении статуса заказа:', error);
    res.status(500).json({ message: 'Произошла ошибка при обновлении статуса заказа' });
  }
});



module.exports = router;