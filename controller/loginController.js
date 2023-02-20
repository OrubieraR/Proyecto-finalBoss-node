"use strict";
const { User } = require("../src/models");
const genAuthToken = require("../src/utils/genAuthToken");

class LoginController {
  async post(req, res, next) {
    try {
      const { name, password } = req.body;

      const user = await User.findOne({ name });

      if (user && (await user.checkPwd(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          userToken: genAuthToken(user._id),
        })
      } else {
        res.status(401)
        throw new Error('Wrong name or password')
      }

      const token =genAuthToken(user._id)

      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
