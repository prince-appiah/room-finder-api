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

      const response = await BookingRepo.getCustomerBookings({ user_id });
      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async getHostBookings(req, res) {
    try {
      const user_id = req.user._id;
      console.log("🚀 ~ user_id", user_id);

      const response = await BookingRepo.getHostBookings({ user_id });
      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async getHostBookingDetails(req, res) {
    try {
      const user_id = req.user._id;
      const { booking_id } = req.params;

      const response = await BookingRepo.getHostBookingDetails({ user_id, booking_id });
      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async checkBookedProperty(req, res) {
    try {
      const user_id = req.user._id;
      const { property_id } = req.params;

      // search through the booking model(match customer and property ids) for the property id passed in the request
      const response = await BookingRepo.checkBookedProperty({
        user_id,
        property_id,
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async cancelBooking(req, res) {
    try {
      const user_id = req.user._id;
      const { property_id } = req.body;

      if (!property_id) {
        return res.status(400).json({ msg: "Property ID is required" });
      }

      // search through the booking model(match customer and property ids) for the property id passed in the request
      const response = await BookingRepo.cancelBooking({
        user_id,
        property_id,
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async addBooking(req, res) {
    const { property_id } = req.body; // this should be the property reference number
    const user_id = req.user._id;

    if (!property_id) {
      return res.status(400).json({ msg: "Property ID is required" });
    }

    try {
      const response = await BookingRepo.createBooking({
        property_id,
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
