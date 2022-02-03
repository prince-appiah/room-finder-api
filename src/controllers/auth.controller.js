const Sentry = require("@sentry/node");
const AuthRepo = require("../repositories/auth.repo");

class AuthController {
  static async signup(req, res) {
    try {
      let payload = req.body;

      const result = await AuthRepo.signup({ email: payload.email });
      return res.status(201).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async login(req, res) {
    try {
      const { email, otp } = req.body;

      const result = await AuthRepo.login({ email, otp });
      return res.status(201).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = AuthController;
