const { User } = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", async(req, res,next)=>{
    try {
        const user = await User.findOne(req.name)
        if (user) {
            res.json({
              id: user._id,
              name: user.name,
              email: user.email,
            })
        }
    } catch (error) {
        next(error)
        res.status(404)
    }
})
module.exports = router;