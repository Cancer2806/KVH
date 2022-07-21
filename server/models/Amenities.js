// Model containing details of cottage amenities

// Use Mongoose as the ODM
const { Schema, model } = require('mongoose');

// Model will be used to contain the full selection of amenities.  A cottage may have some or all of them

const amenitiesSchema = new Schema(
  {
    amenityName: {
      type: String,
      required: true,
    },
    amenityDescription: {
      type: String,
    },
    amenityType: {
      type: [String],
      // the types of amenities will be limited to a specific list - determine whether to have a separate model or subdocument for these
    },
  },
{
  timestamps: true,
},
);

const Amenity = model('Amenity', amenitiesSchema);

module.exports = Amenity;