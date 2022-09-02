const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  folder: {
    type: String,
  },
  url: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  type: {
    type: String,
  },
  format: {
    type: String,
  },
});

// Mongoose hooks here - if any

const Image = model("Image", imageSchema);
module.exports = Image;
