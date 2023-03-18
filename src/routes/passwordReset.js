const User = require("../models/User");
const genAuthToken = require("../utils/genAuthToken");
const sendMail = require("../lib/emailer");
const Joi = require("joi");
const express = require("express");
const emailer = require("../lib/emailer");
const dotenv = require("dotenv")
dotenv.config();

const url = process.env.FRONT_URL

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(200).required().email(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email don't exist..." });

    let token = genAuthToken(user)

    const link = `${url}/passwordReset?token=${token}&email=${user.email}`;
    emailer.sendResetMail(user, link); 
    
    return 
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});
module.exports = router;

