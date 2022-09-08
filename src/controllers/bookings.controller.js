const Sentry = require("@sentry/node");
const BookingRepo = require("../repositories/booking.repo");

class BookingController {
  static async getAllBookings(req, res) {
    try {
      const response = await BookingRepo.getAllBookings();
      return res.status(200).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
  static async getCustomerBookings(req, res) {
    try {
      const user_id = req.user._id;
      console.log("🚀 ~ user_id", user_id);

      const response = await BookingRepo.getCustomerBookings({ user_id });
      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async addBooking(req, res) {
    const { property } = req.query; // this should be the property reference number
    const user_id = req.user._id;
    console.log("🚀 ~ user_id", user_id);

    if (!property) {
      return res.status(400).json({ msg: "Property ID is required" });
    }

    try {
      const response = await BookingRepo.createBooking({
        property,
        user_id,
      });

      return res.status(200).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = BookingController;
