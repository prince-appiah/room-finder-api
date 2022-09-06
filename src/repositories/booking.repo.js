const Sentry = require("@sentry/node");
const BookingModel = require("../models/booking.model");

class BookingRepo {
  static async createBooking({ property, customer }) {
    try {
      //   todo check if property exists more than once
      const response = await BookingModel.create({ property, customer });

      return response;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getCustomerBookings({ customer }) {
    try {
      //   todo check if property exists more than once
      const response = await BookingModel.find({
        customer: { $eq: customer },
      }).populate("property", "-__v");

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = BookingRepo;
