const User = require("../models/User");
const Advert = require("../models/Advert");
const sendMail = require("../lib/emailer");
const Joi = require("joi");
const express = require("express");
const dotenv = require("dotenv")
dotenv.config();


const router = express.Router();
router.post("/", async (req, res) => {
  try {
   
    const userAdvert = await User.findOne({ name: req.body.advert.userOwner });
    if (!userAdvert) return res.status(400).json({ message: "Name don't exist..." });
    const user = await User.findOne({ email: req.body.userEmail});
    if (!user) return res.status(400).json({ message: "Name don't exist..." });

    sendMail.sendMailAdvert(userAdvert,user,req.body.advert)

    return 
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});
module.exports = router;
