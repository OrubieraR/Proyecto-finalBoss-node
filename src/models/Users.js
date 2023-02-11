const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const signUpSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "signUp",
  }
);

signUpSchema.statics.hashPwd = function (plainTextPwd) {
  return bcrypt.hash(plainTextPwd, 9)
}

signUpSchema.methods.checkPwd = function (plainTextPwd) {
  return bcrypt.compare(plainTextPwd, this.password)
}


signUpSchema.statics.list = function (filter, skip, limit, fields, sort) {
  const query = SignUp.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

const SignUp = mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
