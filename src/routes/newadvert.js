const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Advert = require("../models/Advert");
// const fileUpload = require("express-fileupload");
const upload = require("../lib/imgStorage");

// No sube las imagenes a la carpeta (code article)
// const multer = require("multer");
// const upload = multer({ dest: "public/img" });

/* ====================================
     Process with multer - no module
  ===================================== */
// const upload = require("../lib/imgStorage");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/public/img");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

router.post("/", function (req, res, next) {
  // console.log(req.body);

  // const advert = new Advert({
  //   category: req.body.category,
  //   name: req.body.name,
  //   company: req.body.company,
  //   userOwner: req.body.user,
  //   sale: req.body.buyorsale,
  //   description: req.body.description,
  //   price: req.body.price,
  //   photo: req.body.photo,
  // });

  // const advert = new Advert(req.files, req.body);
  const advert = new Advert(req.body);
  // const advert = new Advert(req.files);
  // console.log(req.files, req.body);
  console.log(req.files);

  /*============================
      Process with fileupload
  ============================*/
  // let sampleFile;
  // let uploadPath;

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }

  // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // sampleFile = req.files.photo;
  // uploadPath = __dirname + "/public/img/" + sampleFile.photo;

  // // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv(uploadPath, function (err) {
  //   if (err) return res.status(500).send(err);

  //   res.send("File uploaded!");
  // });

  // const advert = new Advert(req.body);

  advert.save(function (err, anuncioGuardado) {
    if (err) {
      return next(err);
    }
    res.json({ ok: true, advert: anuncioGuardado });
  });
});

module.exports = router;
