const Sentry = require("@sentry/node");
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

  static async findUser(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user != null ? true : false;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = UserRepo;
