const Sentry = require("@sentry/node");
const TokenConfig = require("../config/token");

const OtpRepo = require("./otp.repo");
const UserRepo = require("./user.repo");
const User = require("../models/user.model");

class AuthRepo {
  /**
   * @param {string} userType
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   */
  static async signup({ email, userType, firstname, lastname }) {
    try {
      const response = { msg: "", status: null };

      const existingUser = await UserRepo.findUser(email);

      if (!existingUser) {
        // go ahead and create new one
        const user = await UserRepo.createUser({
          email,
          firstname,
          lastname,
          userType,
        });

        // TODO: Create user profile here
        if (user.status === 201) {
          return {
            ...response,
            msg: "Signup success",
            status: 201,
            otp: user.otp, // TODO: Remove otp from response and send it as a mail
            user: user.data,
          };
        }

        return { ...response, msg: "Could not sign up", status: 400 };
      }
      return { ...response, msg: "User already exists", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  /**
   * @param {string} email
   * @param {number} otp
   *  */
  static async login({ email, otp }) {
    // ?README FIRST: There should be a route to verify otp
    // 1. If email exists, then user has otp already
    // 2. Search in otp table with the email and check expiry date
    // 3. If it is expired, generate new one and update in the table
    // 4. If its not expired, send to the user
    try {
      const response = { msg: "", status: null, data: null };

      // check if user exists
      const userExists = await UserRepo.findUser(email);

      //  if true,verify otp
      if (userExists) {
        // verify otp
        const verifiedOtp = await OtpRepo.verifyOtp({ email, otp });
        console.log("🚀 ~ verifiedOtp", verifiedOtp);
        if (verifiedOtp.status === "valid") {
          // send otp to email from here
          // create token
          const loggedInUser = await User.findOne({ where: { email } })
            .select("-__v")
            .lean();
          console.log("🚀 ~ loggedInUser", loggedInUser);

          const token = await TokenConfig.createToken(loggedInUser);
          return {
            ...response,
            msg: "Login success",
            status: 200,
            data: verifiedOtp.data,
            token,
          };
        }
      }
      return { ...response, msg: "User does not exist", status: 404 };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = AuthRepo;
