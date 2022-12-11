const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  code: {
    type: String,
    index: true,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
});

// Mongoose hooks here - if any

module.exports = model("Otp", otpSchema);
