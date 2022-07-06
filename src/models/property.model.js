const { Schema, model } = require("mongoose");
const Host = require("../models/host.model");

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
      default: "",
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
      default: 0,
    },
    numOfBathrooms: {
      type: Number,
      default: 0,
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
// * this hook adds the property id to the host's properties array
propertySchema.post("validate", async function (doc, next) {
  try {
    await Host.findOneAndUpdate(
      { _id: doc.owner },
      { $push: { properties: doc._id } }
    );

    // TODO: generate reference number and assign to field when a property is created

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
