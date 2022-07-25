// import required dependencies
const db = require('../config/connection');
const { Cottage, Amenity, Property, User } = require('../models');
const amenitySeeds = require('./amenitySeeds.json');
const cottageSeeds = require('./cottageSeeds.json');
const userSeeds = require('./userSeeds.json');
const propertySeed = require('./propertySeed.json');

db.once('open', async () => {
  try {
    await Property.deleteMany({});
    await Cottage.deleteMany({});
    await Amenity.deleteMany({});
    await User.deleteMany({});

    await Property.create(propertySeed);
    await Cottage.create(cottageSeeds);
    await Amenity.create(amenitySeeds);
    await User.create(userSeeds);
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('All Seeds Sown!');
  process.exit(0);
});
