const bcrypt = require("bcrypt");
const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const genAuthToken = require("../utils/genAuthToken");
const emailer = require("../lib/emailer")

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0]);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist...");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  emailer.sendMail(user.email, user.email)
  //hasheamos la passS
  const salt = await bcrypt.genSalt(9);
 user.password = await bcrypt.hash(user.password, salt);


  user = await user.save();

  const token = genAuthToken(user);

  res.status(200).json({ token });
});

module.exports = router;
