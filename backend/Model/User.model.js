const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { NotExtended } = require('http-errors');

const UserSchema = new Schema({
  username: {
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

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()  
  } catch (error) {
    next(error)
  }
  
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    console.log(error);
    throw error
  }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
