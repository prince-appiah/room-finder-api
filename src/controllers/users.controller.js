const Sentry = require("@sentry/node");
const {
  sendWelcomeMessageToUser,
  sendOtpToUserAfterSignup,
  sendOtpToUser,
} = require("../config/mail.config");
const User = require("../models/user.model");
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

  static async editUser(req, res) {
    try {
      const { user_id } = req.params;
      const { firstname, lastname, userType } = req.body;

      if (!user_id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

      const result = await UserRepo.updateUser({
        user_id,
        firstname,
        lastname,
        userType,
      });

      if (result.status === 201) {
        return res.status(200).json(result);
      }

      if (result.status === 404) {
        return res.status(404).json(result);
      }

      return res.status(400).json({ msg: "Could not update user" });
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

      const result = await UserRepo.deleteUser({
        user_id,
      });

      if (result.status === 201) {
        return res.status(200).json(result);
      }

      if (result.status === 404) {
        return res.status(404).json(result);
      }

      return res.status(400).json({ msg: "Could not update user" });
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
        console.log("🚀 ~ result", result);

        if (result.status === 201) {
          // todo: send email to created user and state that their account has been created
          // const user = await User.findOne({ email: result.data.email });
          // add a link for them to log in
          // await sendWelcomeMessageToUser(user);
          // await sendOtpToUser(result.otp, user);
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

  static async getUserInfo(req, res) {
    try {
      const { user_id } = req.query;
      const result = await UserRepo.getUserInfo({ user_id });

      if (result !== null) {
        return res.status(200).json(result);
      }
      return res.status(400).json({ msg: "Could not find user profile" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = UsersController;
