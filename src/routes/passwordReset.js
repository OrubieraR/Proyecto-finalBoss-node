const {User} = require("../models/User")
const genAuthToken = require ("../utils/genAuthToken")
const sendMail  = require("../lib/emailer")
const joi = require("joi")
const express = require("express")
const router = express.Router()
const emailer = require("../lib/emailer")

router.post("/", async (req,res)=>{

try {
  const schema = Joi.object({ email: Joi.string().email().required() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user)
  return res.status(400).json({ message: "Email is already exist..." });

  let token = genAuthToken(user).save()

const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`

emailer.sendResetMail()




}catch(error){
  res.send("An error occured");
        console.log(error);
}




})