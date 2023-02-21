"use strict";
const { User } = require("../models");
const genAuthToken = require("../utils/genAuthToken");
const express = require("express");

const router = express.Router();

router.post("/", async(req, res,next)=>{
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user ||  !(await user.checkPwd(password))) {
      const status = 401
      const message = 'Wrong username or password'
      return res.status(status).json({ message })
    }

    const token =genAuthToken(user._id)
    
    return res.status(200).json({ token })

  } catch (err) {
    next(err);
  }
})

module.exports = router;
