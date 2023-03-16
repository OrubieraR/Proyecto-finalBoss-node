const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Advert = require('../models/Advert');
const upload = require('../lib/imgStorage');

router.post('/', upload.single('photo'), function (req, res, next) {
	const advert = new Advert(req.body);

	// What if req.file is not provided because there is no image uploaded in form.
	// advert.photo = req.file.filename;
	advert.photo = req.file ? req.file.filename : 'default.png';
	console.log(req.file);

	advert.save(function (err, anuncioGuardado) {
		if (err) {
			return next(err);
		}
		res.json({ ok: true, advert: anuncioGuardado });
	});
});

module.exports = router;
