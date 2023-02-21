const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Advert = require("../models/Advert");

router.post("/", function (req, res, next) {
  //console.log(req.body);
  var advert = new Advert({
    name: req.body.name,
    company: req.body.company,
    userOwner: req.body.user,
    sale: req.body.sale,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    photo: req.body.photo,
  });
  //console.log(advert);
  advert.save(function (err, anuncioGuardado) {
    if (err) {
      return next(err);
    }
    res.json({ ok: true, advert: anuncioGuardado });
  });
});

module.exports = router;
