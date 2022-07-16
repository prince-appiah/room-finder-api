const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your firstname"],
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: [true, "Please provide your lastname"],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["admin", "customer", "host"],
      required: [true, "User type is required"],
      default: "customer",
    },
    profilePicture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/ddnozuc0s/image/upload/v1644180173/sample.jpg",
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any
userSchema.post("validate", async function (doc, next) {
  try {
    // if (doc.userType === "host") {
    //   await hostModel.create({ user_id: doc._id, email: doc.email });
    //   next();
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = model("User", userSchema);
