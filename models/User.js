const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true 
    },
  password: { 
    type: String, 
    required: true 
    },
  type: { 
    type: String 
    },
  basket: { 
    type: Array
    }
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User; 