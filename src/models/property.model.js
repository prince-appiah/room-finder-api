const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      maxlength: 50,
    },
    stayPeriod: {
      type: String,
      required: true,
      enum: ["day", "night", "week", "month", "year"],
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any

module.exports = model("Property", propertySchema);
