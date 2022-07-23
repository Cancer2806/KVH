// import required dependencies
const db = require('../config/connection');
const { Cottage, Amenity } = require('../models');
const amenitySeeds = require('./amenitySeeds.json');
const cottageSeeds = require('./cottageSeeds.json');

db.once('open', async () => {
  try {
    await Cottage.deleteMany({});
    await Amenity.deleteMany({});

    await Cottage.create(cottageSeeds);

    await Amenity.create(amenitySeeds);
    

  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('All Seeds Sown!');
  process.exit(0);
});
