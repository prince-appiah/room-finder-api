const { Schema, model } = require("mongoose");

const amenitySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  icon: {
    type: String,
    default: null,
  },
});

// Mongoose hooks here - if any

module.exports = model("Amenity", amenitySchema);
