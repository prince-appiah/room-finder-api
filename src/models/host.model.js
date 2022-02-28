const { Schema, model } = require("mongoose");

const hostSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "User is required"],
    },
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1589735894/default_profile_picture_xqjqjy.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

// Mongoose hooks here - if any

module.exports = model("Host", hostSchema);
