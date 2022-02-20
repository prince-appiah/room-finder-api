const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    roomType: {
      type: Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    price: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
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
      required: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any

module.exports = model("Property", propertySchema);
