const mongoose = require('mongoose');
const { model, Schema} = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://user_1122:1122@0123.hgnbueb.mongodb.net/?retryWrites=true&w=majority&appName=0123', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'paytm'
})
  .then(() => {
    console.log('MongoDB connection successul');
  })
  .catch(err => {
    console.log('MongoDB connection failed, full error - ' + err);
  });

// User schema and model creation
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

const User = model('User', userSchema);

module.exports = User;

