const Sentry = require("@sentry/node");
const BookingModel = require("../models/booking.model");
const Customer = require("../models/customer.model");
const Host = require("../models/host.model");
const propertyModel = require("../models/property.model");

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

  static async createBooking({ property_id, user_id }) {
    try {
      const cus = await Customer.findOne({ user_id });
      const listing = await propertyModel.find({ _id: property_id }).populate("owner");

      const response = await BookingModel.create({
        property: property_id,
        customer: cus._id,
        owner: listing[0].owner,
      });

      const createdBooking = BookingModel.findOne({
        _id: response._id,
      }).populate({
        path: "property",
        populate: { path: "images owner" },
      });

      if (createdBooking) {
        // increase the interestedParties field in the property model by 1
        await propertyModel.findOneAndUpdate({ _id: property_id }, { $inc: { interestedParties: 1 } }).exec();
      }

      return createdBooking;
    } catch (error) {
      console.log("🚀 ~ error", error);
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

  static async getHostBookings({ user_id }) {
    try {
      // search the host with user id
      const host = await Host.findOne({ user_id });
      const response = await BookingModel.find({
        owner: { $eq: host._id },
      })
        .populate("customer", "-__v")
        .populate({
          path: "property",
          populate: { path: "images" },
        });
      // .sort({ createdAt: -1 });

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async getHostBookingDetails({ user_id, booking_id }) {
    try {
      // search the host with user id
      const host = await Host.findOne({ user_id });
      const response = await BookingModel.findOne({
        owner: { $eq: host._id },
        $and: [{ _id: { $eq: booking_id } }],
      })
        .populate("customer", "-__v")
        // .populate('property','-__v')
        .populate({
          path: "property",
          populate: { path: "images" },
        })
        .sort({ createdAt: -1 });

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async checkBookedProperty({ user_id, property_id }) {
    try {
      // search the customer with user id
      const customer = await Customer.findOne({ user_id });
      const response = await BookingModel.findOne({
        status: "pending",
        $and: [{ customer: { $eq: customer._id } }, { property: { $eq: property_id } }],
      }).populate({
        path: "property",
        populate: { path: "images owner" },
      });

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async cancelBooking({ user_id, property_id }) {
    try {
      // search the customer with user id
      const customer = await Customer.findOne({ user_id });
      const response = await BookingModel.findOneAndUpdate(
        {
          $and: [{ customer: { $eq: customer._id } }, { property: { $eq: property_id } }],
        },
        { status: "cancelled" },
      );

      if (response) {
        await propertyModel.findOneAndUpdate({ _id: property_id }, { $inc: { interestedParties: -1 } }).exec();
      }

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = BookingRepo;
