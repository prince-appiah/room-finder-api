const Sentry = require("@sentry/node");
const User = require("../models/user.model");

class UserRepo {
  static async createUser({ email, firstname, lastname, userType }) {
    try {
      let response = { msg: "", status: null, data: null };

      let payload = { firstname, lastname, email, userType };
      // existing user has been checked already, go ahead and create the user
      const user = await User.create(payload);
      console.log("🚀 ~ user", user);

      return user;
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
