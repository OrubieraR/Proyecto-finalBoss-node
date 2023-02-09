
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name :{ type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: 'User',
  }
)

userSchema.statics.hashPwd = function (plainTextPwd) {
  return bcrypt.hash(plainTextPwd, 9)
}

userSchema.methods.checkPwd = function (plainTextPwd) {
  return bcrypt.compare(plainTextPwd, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;
