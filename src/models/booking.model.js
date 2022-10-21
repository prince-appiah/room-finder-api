const { Schema, model } = require("mongoose");
const Customer = require("./customer.model");

const bookingSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Booking must belong to a customer"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Host",
      required: [true, "Booking must include a listing owner"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Booking must have a property"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Mongoose hooks here - if any
bookingSchema.post("validate", async function (doc, next) {
  console.log("🚀 ~ doc", doc);
  try {
    const cus = await Customer.findOne({ user_id: doc.customer });
    console.log("🚀 ~ cus", cus);
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: doc.customer },
      { $push: { bookings: doc._id } },
      { new: true }
    );
    console.log("🚀 ~ updatedCustomer", updatedCustomer);
    next();
  } catch (e) {
    console.log("🚀 ~ e", e);
    next(e);
  }
});

const BookingModel = model("Booking", bookingSchema);
module.exports = BookingModel;
