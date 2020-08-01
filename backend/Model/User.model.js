const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true, 
    unique: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true, 
  }

});

const User = mongoose.model('user', UserSchema)
