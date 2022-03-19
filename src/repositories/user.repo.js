const Sentry = require("@sentry/node");
const MailConfig = require("../config/mail.config");

const User = require("../models/user.model");
const Host = require("../models/host.model");
const OtpRepo = require("./otp.repo");
const ProfileRepo = require("./profile.repo");
const handleMongooseError = require("../handlers/handleMongooseError");
const errorHandler = require("../handlers/errorHandlers");

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

module.exports = UserRepo;
