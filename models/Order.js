const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  number: {
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
  status: { 
    type: String 
    },
  date: {
    type: Date,
    default: Date.now 
    },
  furniture: [
    {
      furnitureID: String,
      Quantity: Number
    }
  ]
}, { versionKey: false });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 