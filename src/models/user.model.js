const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["admin", "user", "host"],
      required: true,
      default: "user",
    },
    profilePicture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1589735894/default_profile_picture_xqjqjy.png",
    },
    otp: {
      code: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any

module.exports = model("User", userSchema);
