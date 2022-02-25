const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    roomType: {
      type: Schema.Types.ObjectId,
      ref: "RoomType",
      required: [true, "Room type is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      maxlength: 50,
    },
    stayPeriod: {
      type: String,
      required: [true, "Stay period is required"],
      enum: ["day", "night", "week", "month", "year"],
    },
    images: [
      {
        type: String,
        required: [true, "Image is required"],
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any

module.exports = model("Property", propertySchema);
