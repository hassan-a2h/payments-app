const mongoose = require('mongoose');
const { model, Schema} = require('mongoose');
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'paytm'
})
  .then(() => {
    console.log('MongoDB connection successul');
  })
  .catch(err => {
    console.log('MongoDB connection failed, full error - ' + err);
  });

// Schemas
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'Please provide a valid email'],
    minLength: 6,
    maxLength: 64
  },

  password: {
    type: String,
    minLength: 8,
    maxLength: 32,
    required: true
  }
});

const accountSchema = new Schema({
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  }
});

// Model creation
const User = model('User', userSchema);
const Account = model('Account', accountSchema);

module.exports = { User, Account };

