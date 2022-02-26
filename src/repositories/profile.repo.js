const Sentry = require("@sentry/node");
const Host = require("../models/host.model");

class ProfileRepo {
  static async createProfile({ user_id, userType }) {
    try {
      switch (userType) {
        case "host":
          const newHost = await Host.create({ user_id });
          return newHost;

        default:
          return null;
      }
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = ProfileRepo;
