const Sentry = require("@sentry/node");

const OtpRepo = require("./otp.repo");
const UserRepo = require("./user.repo");

class AuthRepo {
  /**
   * @param {string} userType
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   */
  static async signup({ email, userType, firstname, lastname }) {
    // 2. Since email is unique, use that to create new otp
    // 3. Upon successful registration, send the created otp to the user using mail service
    try {
      const response = { msg: "", status: null, user: null };

      // 1. User provides dtails for signup - check if exists before moving to the next function
      const existingUser = await UserRepo.findUser(email);
      console.log("🚀 ~ existingUser", existingUser);

      if (!existingUser) {
        // go ahead and create new one
        const user = await UserRepo.createUser({
          email,
          firstname,
          lastname,
          userType,
        });

        // create otp with user id
        const otp = await OtpRepo.createOtp(user.email);
        // if otp is created, send a welcome message to user including the otp code
        return { ...response, msg: "User created", status: 201, user };
      }
      // rreturn a message saying user exists
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
        // else user not foud error
      } else {
        return { ...response, msg: "User does not exist", status: 404 };
      }
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = AuthRepo;
