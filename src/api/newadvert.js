const express = require("express");
const router = express.Router();
const Advert = require("../models/Advert");

router.post("/", function (req, res, next) {
  // console.log(req.body);
  var advert = new Advert(req.body);
  advert.save(function (err, anuncioGuardado) {
    if (err) {
      return next(err);
    }
    res.json({ ok: true, advert: anuncioGuardado });
  });
});

module.exports = router;
