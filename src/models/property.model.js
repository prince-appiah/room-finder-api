const { Schema, model } = require("mongoose");
const Host = require("../models/host.model");
const generator = require("otp-generator");

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Host",
      required: [true, "Owner/Host is required"],
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    referenceNo: {
      type: String,
      unique: true,
      required: [true, "Reference number is required"],
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
    numOfBedrooms: {
      type: Number,
      required: true,
    },
    numOfBathrooms: {
      type: Number,
      required: true,
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
      enum: ["night", "week", "month", "year"],
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
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
propertySchema.post("validate", async function (doc, next) {
  try {
    await Host.findOneAndUpdate(
      { _id: doc.owner },
      { $push: { properties: doc._id } }
    );

    next();
  } catch (e) {
    next(e);
  }
});

// * this hook removes the property id from the host's properties array
propertySchema.post("findOneAndRemove", async function (doc, next) {
  try {
    await Host.findOneAndUpdate(
      { _id: doc.owner },
      { $pull: { properties: doc._id } },
      { new: true }
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("Property", propertySchema);
