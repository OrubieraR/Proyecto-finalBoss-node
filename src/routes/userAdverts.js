const express = require('express');
const router = express.Router();
const Advert = require('../models/Advert');

router.get('/user/:userOwner', async (req, res, next) => {
	try {
		const userOwner = req.params.userOwner;

		const advert = await Advert.getUserAdvert(userOwner);
		res.json({ results: advert });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
