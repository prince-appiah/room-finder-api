const { Schema, model } = require("mongoose");

const amenitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
});

// Mongoose hooks here - if any

module.exports = model("Amenity", amenitySchema);
