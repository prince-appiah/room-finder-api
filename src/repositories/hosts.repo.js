const Sentry = require("@sentry/node");

const MailConfig = require("../config/mail.config");
const Booking = require("../models/booking.model");
const Host = require("../models/host.model");
const Property = require("../models/property.model");

class HostsRepo {
  static async createHost({ firstname, lastname, email, userType }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingUser = await this.findUser(email);

      if (existingUser) {
        return {
          ...response,
          msg: "User already exists",
          status: 400,
        };
      }

      // go ahead, crete a user model and a host model
      const user = await this.createUser({
        email,
        firstname,
        lastname,
        userType,
      });

      // const prof = await ProfileRepo.createProfile({
      //   user_id: user.data._id,
      //   email: user.data.email,
      //   userType,
      // });
      // console.log("🚀 ~ prof", prof);

      if (user.status === 201) {
        await MailConfig.sendWelcomeMessageToUser(user.data);
        await MailConfig.sendOtpToUser(user.otp, user.data);

        return {
          ...response,
          msg: "Host created",
          status: 201,
          otp: user.otp,
          data: user.data,
        };
      }

      return { ...response, msg: "Could not create host", status: 400 };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getAllHosts() {
    try {
      const hosts = await Host.find({}).select("-__v");

      return hosts;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  /**
   * @param {object} payload
   * @param {string} payload.companyName
   * @param {string} payload.about
   * @param {string} payload.website
   * @param {string} payload.phone
   * @param {string} payload.firstname
   * @param {string} payload.lastname
   *  */
  static async updateHostProfile({ user_id, payload }) {
    try {
      // search through hosts table with the user_id
      // update the fields with the request body
      const existingHost = await Host.findOne({ user_id });

      if (!existingHost) {
        return { msg: "Host profile not found", status: 404, data: null };
      }

      const result = await Host.findOneAndUpdate(
        { user_id },
        { ...payload },
        { new: true }
      );

      if (result) {
        return { msg: "Host profile updated", status: 201, data: result };
      }
      return {
        msg: "Could not update host profile",
        status: 400,
        data: null,
      };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  // count bookings, listings belonging to host
  static async getDashboardReports({ user_id }) {
    try {
      // using the user_id, sewarch for host and use _id for next query
      const host = await Host.findOne({ user_id });
      // todo use below method to find properties or get properties from the host model
      const properties = await Property.count({
        owner: { $eq: host._id },
      });

      const bookings = await Booking.count({
        owner: { $eq: host._id },
      });

      const response = [
        { title: "Total Listings", value: properties },
        { title: "Total Bookings", value: bookings },
      ];

      return response;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getHost(id) {
    try {
      let response = { msg: "", status: null, data: null };

      const host = await Host.findOne({ _id: id }).select("-__v");

      if (!host) {
        return { ...response, msg: "Host not found", status: 404 };
      }

      return { ...response, msg: "Success", status: 200, data: host };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateHost(id, payload) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingHost = await Host.findOne({ _id: id });
      if (!existingHost) {
        return { ...response, msg: "Host not found", status: 404 };
      }

      const updatedHost = await Host.findOneAndUpdate({ _id: id }, payload, {
        new: true,
      });
      // const updatedHost=await Host.findByIdAndUpdate(id, update, options)

      if (updatedHost) {
        return {
          ...response,
          msg: "Host updated",
          status: 200,
          data: updatedHost,
        };
      }
      return { ...response, msg: "Could not update host", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async deleteHost(id) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingHost = await Host.findOne({ _id: id });

      if (existingHost) {
        await Host.findOneAndDelete({ _id: id });

        return { ...response, msg: "Host deleted", status: 200 };
      }

      return { ...response, msg: "Host not found", status: 404 };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = HostsRepo;
