// Model containing details of cottage amenities

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// Model will be used to contain the full selection of amenities.  A cottage may have some or all of them

const amenitySchema = new Schema(
  {
    amenityName: {
      type: String,
      required: true,
    },
    amenityDescription: {
      type: String,
    },
    amenityType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Amenity = model('Amenity', amenitySchema);

module.exports = Amenity;