const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const genAuthToken = require("../utils/genAuthToken");
const emailer = require("../lib/emailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(3).max(1024).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0]);
  let name = await User.findOne({ name: req.body.name });
  if (name) {
    return res.status(400).json({ message: "Username is already exist..." });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Email is already exist..." });
  }
  try {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.password = await User.hashPwd(user.password);
    console.log('esto es user',user) 
    user = await user.save();
    const token = genAuthToken(user);
    emailer.sendMail(user);
    
    return res.status(201).json({ token });


  } catch (error) {}
  console.log("MI CODIGO SIEMPRE FUNCIONA");
  return res.status(404).json("User not registered")

});

module.exports = router;
