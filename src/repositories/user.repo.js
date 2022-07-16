const Sentry = require("@sentry/node");

const Customer = require("../models/customer.model");
const Host = require("../models/host.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const OtpRepo = require("./otp.repo");

class UserRepo {
  static async createUser({ email, firstname, lastname, userType }) {
    try {
      let response = { msg: "", status: null, otp: null, data: null };

      let payload = { firstname, lastname, email, userType };

      // existing user has been checked already, go ahead and create the user
      const user = new User(payload);
      // create otp with user email
      const otp = await OtpRepo.createOtp(user.email);

      if (user && otp.data) {
        await user.save();
        // create host/customer based on userType
        if (userType === "host") {
          await Host.create({
            user_id: user._id,
            firstname,
            lastname,
            email,
          });
        }

        if (userType === "customer") {
          await Customer.create({
            user_id: user._id,
            firstname,
            lastname,
            email,
          });
        }

        return {
          ...response,
          msg: "User created",
          status: 201,
          otp: otp.data.code,
          data: user,
        };
      }

      return { ...response, msg: "Could not create user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  // return number of registered users, approved and unapproved listings
  static async getAdminDashboardReport() {
    try {
      const properties = await Property.find().select("-__v");
      const approvedListings = properties.filter(
        (item) => item.isApproved
      ).length;
      const pendingApprovals = properties.filter(
        (item) => !item.isApproved
      ).length;

      const users = await User.count();

      const response = [
        { title: "Registered Users", value: users },
        { title: "Approved Listings", value: approvedListings },
        { title: "Pending Approvals", value: pendingApprovals },
      ];

      return response;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find().select("-__v");

      return users;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async findUser(email) {
    try {
      const user = await User.findOne({ email });

      return user != null ? true : false;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = UserRepo;
