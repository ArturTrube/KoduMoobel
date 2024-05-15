var express = require('express');
var router = express.Router();
const multer = require('multer');
const requireAuth = require('./checkRequest');
const Furniture = require('../models/Furniture');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', requireAuth('Admin'), function(req, res, next) {
  res.render('admin-catalog');
});

router.get('/adding', requireAuth('Admin'), function(req, res, next) {
  res.render('admin-adding');
});

router.get('/orders', requireAuth('Admin'), function(req, res, next) {
  res.render('admin-orders');
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

module.exports = router;