const bcrypt = require("bcrypt");
const { array } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    favAdverts: [
      {
        _id: mongoose.Types.ObjectId,
        name: String,
        userOwner: String,
        PGI: Number,
        sale: String,
        price: Number,
        photo: String,
        category: [String],
        description: String,
      },
    ],
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