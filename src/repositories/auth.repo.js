const Sentry = require("@sentry/node");
const TokenConfig = require("../config/token");

const OtpRepo = require("./otp.repo");
const UserRepo = require("./user.repo");
const User = require("../models/user.model");
const ProfileRepo = require("./profile.repo");
const MailConfig = require("../config/mail.config");

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

        // await ProfileRepo.createProfile({
        //   user_id: user.data._id,
        //   email: user.data.email,
        //   userType,
        // });

        if (user.status === 201) {
          await MailConfig.sendWelcomeMessageToUser(user.data);
          await MailConfig.sendOtpToUser(user.otp, user.data);

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
      const response = { msg: "", status: null };

      // check if user exists
      const userExists = await UserRepo.findUser(email);

      //  if true,verify otp
      if (userExists) {
        // verify otp
        const verifiedOtp = await OtpRepo.verifyOtp({ email, otp });

        if (verifiedOtp.status === "valid") {
          // send otp to email from here
          // create token
          const loggedInUser = await User.findOne({ email })
            .select("-__v") // replace _id with a unique uuid
            .lean();

          const token = await TokenConfig.createToken(loggedInUser);

          if (token) {
            return {
              ...response,
              msg: "Login success",
              status: 200,
              token,
            };
          }
          return {
            ...response,
            msg: "Could not login",
            status: 400,
            token,
          };
        }
        return {
          ...response,
          msg: "OTP is incorrect",
          status: 400,
        };
      }
      return { ...response, msg: "User does not exist", status: 404 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async logout({ req }) {
    try {
      let response = { msg: "", status: null };

      const decoded = req.user ? req.user : null;
      const authHeader = req.headers.authorization
        ? req.headers.authorization
        : null;

      if (authHeader && decoded) {
        delete req.user;
        delete req.headers.authorization;

        return { ...response, msg: "Logout success", status: 200 };
      }
      return { ...response, msg: "Could not log out", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = AuthRepo;
