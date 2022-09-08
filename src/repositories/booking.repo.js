const Sentry = require("@sentry/node");
const BookingModel = require("../models/booking.model");
const Customer = require("../models/customer.model");

class BookingRepo {
  static async getAllBookings() {
    try {
      const response = await BookingModel.find()
        .populate("customer", "-__v")
        .populate("property", "-__v")
        .sort({ createdAt: -1 });

      return response;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async createBooking({ property, user_id }) {
    try {
      // find customer with this user id and the customer id for creating the booking
      const cus = await Customer.findOne({ user_id });
      const response = await BookingModel.create({
        property,
        customer: cus._id,
      });

      const createdBooking = BookingModel.findOne({
        _id: response._id,
      }).populate({
        path: "property",
        populate: { path: "images owner" },
      });

      return createdBooking;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getCustomerBookings({ user_id }) {
    try {
      // search the customer with user id
      const customer = await Customer.findOne({ user_id });
      const response = await BookingModel.find({
        customer: { $eq: customer._id },
      })
        .populate({
          path: "property",
          populate: { path: "images owner" },
        })
        .sort({ createdAt: -1 });

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = BookingRepo;
