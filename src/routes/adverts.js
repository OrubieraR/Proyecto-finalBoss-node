const express = require('express');
const router = express.Router();
const Advert = require('../models/Advert');

router.get('/', async (req, res, next) => {
	try {
		const adverts = await Advert.filterList();

		res.json({ results: adverts });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const advertID = req.params.id;

		const advert = await Advert.getUniqueAdvert(advertID);
		res.json({ results: advert });
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const advertID = req.params.id;

		await Advert.deleteAdvert(advertID);
		res.status(201).json('Success');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
