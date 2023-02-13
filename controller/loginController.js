"use strict";
const jwt = require("jsonwebtoken");
const { User } = require("../src/models");

class LoginController {
  async post(req, res, next) {
    try {
      const { name, password } = req.body;

      const user = await User.findOne({ name });

      if (!user || !(await user.checkPwd(password))) {
        const status = 401;
        const message = "Wrong username or password";
        return res.status(status).json({ message });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });

      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
