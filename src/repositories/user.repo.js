const Sentry = require("@sentry/node");

class UserRepo {
  static async createUser(data) {
    // try {
    //   let payload = {
    //     first_name: data.first_name ? data.first_name : "",
    //     last_name: data.last_name ? data.last_name : "",
    //     email: data.email ? data.email.trim() : "",
    //     phoneNumber: data.phoneNumber ? data.phoneNumber : "",
    //     profileAvatar: data.profileAvatar ? data.profileAvatar : "",
    //   };
    //   const user = await User.create(payload);
    //   return user;
    // } catch (error) {
    //   Sentry.captureException(error);
    //   return error;
    // }
  }

  static async findUser(email) {
    // try {
    //   const user = await User.findOne({ where: { email } });
    //   return user != null ? true : false;
    // } catch (error) {
    //   Sentry.captureException(error);
    //   return error;
    // }
  }
}

module.exports = UserRepo;
