const mongoose = require('mongoose');


const furnitureSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true 
    },
  price: {
    type: String, 
    required: true 
    },
  description: { 
    type: String, 
    required: true 
    },
  type: { 
    type: String 
    },
  photoLink: { 
    type: String
    }
}, { versionKey: false });

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture; 