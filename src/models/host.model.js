const { Schema, model } = require("mongoose");
const User = require("./user.model");

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
// TODO when you edit host's email, it should reflect on the main user model
// hostSchema.post("findOneAndUpdate", async function (doc, next) {
//   try {
//     console.log("updating host 's user");
//     if (doc.email) {
//       const us = await User.findOneAndUpdate(
//         { _id: doc.user_id },
//         { email: doc.email }
//       );

//       console.log("us", us);
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// TODO delete user model when a host is deleted
hostSchema.post("findOneAndRemove", async function (doc, next) {
  try {
    await User.findOneAndRemove({ _id: doc.owner });

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("Host", hostSchema);
