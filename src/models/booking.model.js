const { Schema, model } = require("mongoose");
const Customer = require("./customer.model");

const bookingSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Booking must belong to a customer"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Booking must have a property"],
    },
    status: {
      type: String,
      enum: ["pending", "complete", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any
bookingSchema.post("validate", async function (doc, next) {
  try {
    await Customer.findOneAndUpdate(
      { user_id: doc.customer },
      { $push: { bookings: doc._id } }
    );

    next();
  } catch (e) {
    console.log("🚀 ~ e", e);
    next(e);
  }
});

const BookingModel = model("Booking", bookingSchema);
module.exports = BookingModel;
