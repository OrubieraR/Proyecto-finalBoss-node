const mongoose = require('mongoose');

const advertsSchema = mongoose.Schema(
	{
		name: String,
		userOwner: String,
		company: String,
		PGI: Number,
		sale: String,
		price: Number,
		photo: String,
		category: [String],
		description: String,
	},
	{
		collection: 'Advert',
	}
);

advertsSchema.statics.filterList = async function (
	filter,
	skip,
	limit,
	select,
	sort
) {
	const query = Advert.find(filter);

	query.skip(parseInt(skip));
	query.limit(parseInt(limit));
	query.select(select);
	query.sort(sort);

	return query.exec();
};

advertsSchema.statics.getUniqueAdvert = async function (advertID) {
	const advert = Advert.findOne({ _id: advertID });

	return advert.exec();
};

advertsSchema.statics.deleteAdvert = async function (advertID) {
	const advert = Advert.remove({ _id: advertID });

	return advert.exec();
};

advertsSchema.statics.getUserAdvert = async function (userOwner) {
	const advert = Advert.find({ userOwner: userOwner });
	return advert.exec();
};

// Cargar json de anuncios
/* advertsSchema.statics.loadJSON = async function () {
  const file = path.join(__dirname, '../../initialAdverts.json')
  const data = await fs.readFile(file, { encoding: 'utf-8' })
  if (!data) throw new Error(`${file} está vacío!`)
  const adverts = JSON.parse(data).adverts
  const insertedAdverts = await Advert.insertMany(adverts)
  return insertedAdverts
} */

const Advert = mongoose.model('Advert', advertsSchema);

module.exports = Advert;
