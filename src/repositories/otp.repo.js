const Sentry = require("@sentry/node");
const res = require("express/lib/response");
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
      const existingOtp = await Otp.findOne({ email }).select("-__v");

      // create new one if it doesnt
      if (!existingOtp) {
        const newOtp = await Otp.create({ code, email, expiryDate });

        return {
          ...response,
          msg: "New OTP generated",
          status: 200,
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
      const updatedOtp = await Otp.findOneAndUpdate({ email }, { code, expiryDate }, { new: true }).select("-__v");

      return { ...response, msg: "OTP updated", status: 200, data: updatedOtp };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async verifyOtp({ email, otp }) {
    let response = { msg: "", status: null };

    let currentTime = Date.now();

    try {
      const existingOtp = await Otp.findOne({ email });

      if (existingOtp) {
        // check the expiry date
        const expiryTime = existingOtp.expiryDate;
        const existingCode = existingOtp.code;

        // checks
        const isExpired = expiryTime < currentTime;
        const isNotExpired = currentTime > expiryTime;
        const isValid = existingCode === otp;
        const isNotValid = existingCode !== otp;

        switch ((isExpired, isNotExpired, isValid, isNotValid)) {
          case isNotExpired && isValid:
            return {
              ...response,
              msg: "OTP Verified",
              status: "valid",
            };

          case isExpired:
            // await Otp.findOneAndDelete({ email });
            return { ...response, msg: "OTP Expired", status: "invalid" };

          case isNotValid:
            return { ...response, msg: "OTP Invalid", status: "invalid" };

          default:
            return {
              ...response,
              msg: "OTP Verification failed",
              status: "invalid",
            };
        }
      }
      return { ...response, msg: "OTP does not exist", status: "invalid" };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = OtpRepo;
