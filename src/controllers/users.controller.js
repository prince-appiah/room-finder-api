const Sentry = require("@sentry/node");
const UserRepo = require("../repositories/user.repo");

class UsersController {
  static async getAllUsers(req, res) {
    try {
      const result = await UserRepo.getAllUsers();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = UsersController;
