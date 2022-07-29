// import required dependencies
const db = require('../config/connection');
const { Cottage, Amenity, Property, User, Booking } = require('../models');
const amenitySeeds = require('./amenitySeeds.json');
const cottageSeeds = require('./cottageSeeds.json');
const userSeeds = require('./userSeeds.json');
const propertySeed = require('./propertySeed.json');
const bookingSeeds = require('./bookingSeeds.json');

db.once('open', async () => {
  try {
    await Booking.deleteMany({});
    await Property.deleteMany({});
    await Cottage.deleteMany({});
    await Amenity.deleteMany({});
    await User.deleteMany({});

    
    await Property.create(propertySeed);
    await Cottage.create(cottageSeeds);
    await Amenity.create(amenitySeeds);
    await User.create(userSeeds);

    for (let i = 0; i < bookingSeeds.length; i++) {
      const { _id, guestEmail, cottageName } = await Booking.create(bookingSeeds[i]);
      const user = await User.findOneAndUpdate(
        { userEmail: guestEmail },
        {
          $addToSet: {
            bookings: _id,
          },
        }
      );
      const cottage = await Cottage.findOneAndUpdate(
        { cottageName: cottageName },
        {
          $addToSet: {
            bookings: _id,
          },
        }
      );
    }
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('All Seeds Sown!');
  process.exit(0);
});
