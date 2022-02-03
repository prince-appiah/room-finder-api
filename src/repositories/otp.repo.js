const Sentry = require("@sentry/node");
const otpGenerator = require("otp-generator");

const { Otp } = require("../models");

class OtpRepo {
  static async createOtp(email) {
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });
    const date = new Date();
    console.log("🚀 ~ date", date);
    const currentTime = Date.now();
    console.log("🚀 ~ currentTime", currentTime);
    let expiry_date = date.setHours(date.getHours() + 12); // sets date to 12 hours
    console.log("🚀 ~ expiry_date", expiry_date);

    try {
      const newOtp = await Otp.build({ otp, email, expiry_date });
      //   console.log("🚀 ~ newOtp", newOtp);
      return newOtp;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async verifyOtp() {}
}

module.exports = OtpRepo;
