const Sentry = require("@sentry/node");
const UserRepo = require("../repositories/user.repo");

class UsersController {
  static async getAllHosts(req, res) {
    try {
      const result = await UserRepo.getAllHosts();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async createHost(req, res) {
    try {
      const { firstname, lastname, email, userType } = req.body;

      if (!firstname || !lastname || !email || !userType) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const result = await UserRepo.createHost({
        firstname,
        lastname,
        email,
        userType,
      });

      if (result.status === 201) {
        return res.status(201).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async getHost(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Host ID is required" });
      }

      const result = await UserRepo.getHost(id);

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async updateHost(req, res) {
    try {
      const { id } = req.params;
      const { firstname, lastname, email, phone } = req.body;

      const result = await UserRepo.updateHost(id, {
        firstname,
        lastname,
        email,
        phone,
      });

      if (result.status === 200) {
        return res.status(200).json(result);
      }

      if (result.status === 404) {
        return res.status(404).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async deleteHost(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Host ID is required" });
      }

      const result = await UserRepo.deleteHost(id);

      if (result.status === 200) {
        return res.status(204).json(result);
      }

      if (result.status === 404) {
        return res.status(404).json(result);
      }

      return res.status(400).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = UsersController;
