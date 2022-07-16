const Sentry = require("@sentry/node");
const UserRepo = require("../repositories/user.repo");

class UsersController {
  static async getAdminDashboardReport(req, res) {
    try {
      const result = await UserRepo.getAdminDashboardReport();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async createUser(req, res) {
    try {
      const { firstname, lastname, email, userType } = req.body;

      if (!firstname || !lastname || !email || !userType) {
        return res.status(400).json({
          msg: "Please provide all values",
          fields: ["firstname", "lastname", "email", "userType"],
        });
      }

      const existingUser = await UserRepo.findUser(email);

      if (!existingUser) {
        const result = await UserRepo.createUser({
          firstname,
          lastname,
          email,
          userType,
        });

        if (result.status === 201) {
          // todo: send email to created user and state that their account has been created
          // add a link for them to log in
          return res.status(201).json({ msg: result.msg, user: result.data });
        }
        return res.status(400).json({ msg: "Could not create user" });
      }

      return res.status(400).json({ msg: "User already exists" });
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

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
