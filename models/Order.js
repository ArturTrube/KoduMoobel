const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  number: {
    type: String, 
    required: true 
    },
  author: {
    type: String, 
    required: true 
    },
  address: {
    type: String, 
    required: true 
    },
  contact: { 
    type: String, 
    required: true 
    },
  total: { 
    type: String, 
    },
  status: { 
    type: String 
    },
  date: {
    type: Date,
    default: Date.now 
    },
  furniture: [
    {
      furnitureTitle: String,
      quantity: String
    }
  ]
}, { versionKey: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 