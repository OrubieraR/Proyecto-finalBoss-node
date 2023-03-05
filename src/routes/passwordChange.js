const User = require("../models/User");
const Joi = require("joi");
const express = require("express");
const emailer = require("../lib/emailer");

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    console.log(req.body.email);
    console.log(req.body.password);
    const schema = Joi.object({
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(3).max(1024).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user !== null) {
      console.log("User exists in db");
      user.password = req.body.password;
      user.password = await User.hashPwd(user.password);
      user
        .update({
          password: user.password,
        })
        .then(() => {
          console.log("password updated");
          return res.status(200).send({ message: "Password updated" });
        });
    }
  } catch (error) {
    console.log("no user exist in db to update");
    return res.status(404).json("no user exists in db to update");
  }
});
module.exports = router;
