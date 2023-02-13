const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024
    },
  },
  {
    collection: "User",
  }
);

userSchema.statics.hashPwd = function (plainTextPwd) {
  return bcrypt.hash(plainTextPwd, 9);
};

userSchema.methods.checkPwd = function (plainTextPwd) {
  return bcrypt.compare(plainTextPwd, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
