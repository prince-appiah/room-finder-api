const Sentry = require("@sentry/node");
const moment = require("moment");
const otpGenerator = require("otp-generator");
const Otp = require("../models/otp.model");

class OtpRepo {
  static async createOtp(email) {
    const code = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const date = new Date();
    const currentTime = Date.now(); // remove new

    let expiryDate = date.setHours(date.getHours() + 12); // sets date to 12 hours

    try {
      let response = { msg: "", status: null, data: null };
      // check if user email already exists
      const existingOtp = await Otp.findOne({ email });
      // create new one if it doesnt
      if (!existingOtp) {
        const newOtp = await Otp.create({ code, email, expiryDate });

        return {
          ...response,
          msg: "New OTP generated",
          status: 201,
          data: newOtp,
        };
      }
      // check if its expired, return the exisiting code if not expired else update it
      if (existingOtp.expiryDate > currentTime) {
        return {
          ...response,
          msg: "OTP already exists",
          status: 200,
          data: existingOtp,
        };
      }

      // update existing email's otp and expiry date
      const updatedOtp = await Otp.updateOne(
        { email },
        { code, expiryDate },
        { new: true }
      );

      return { ...response, msg: "OTP updated", status: 200, data: updatedOtp };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async verifyOtp() {}
}

module.exports = OtpRepo;
