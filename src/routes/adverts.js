const express = require("express");
const router = express.Router();
const Advert = require("../models/Advert");

router.get("/", async (req, res, next) => {
  try {
    const adverts = await Advert.filterList();

    res.json({ results: adverts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
