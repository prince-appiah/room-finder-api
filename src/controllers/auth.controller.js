const Sentry = require("@sentry/node");
const AuthRepo = require("../repositories/auth.repo");
const OtpRepo = require("../repositories/otp.repo");

class AuthController {
  /**
   * User signs up with user type, firstname, lastname and email address
   * @param {Express.Request} req
   * @param {Express.Response} res
   *  */
  static async signup(req, res) {
    try {
      const { userType, firstname, lastname, email } = req.body;

      if (!userType || !firstname || !lastname || !email) {
        return res.status(400).json({ msg: "Please provide all the details" });
      }

      if (!["user", "host", "admin"].includes(userType)) {
        return res
          .status(400)
          .json({ msg: "User type must be a 'user', 'host' or 'admin'" });
      }

      const result = await AuthRepo.signup({
        email,
        userType,
        firstname,
        lastname,
      });
      // check result status before returning a response
      if (result.status === 201) {
          return res.status(201).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ msg: "Provide an email and otp" });
      }

      const result = await AuthRepo.login({ email, otp });

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

  static async logout(req, res) {
    try {
      const result = await AuthRepo.logout({ req });

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async getOtp(req, res) {
    try {
      const { email } = req.body;

      const result = await OtpRepo.createOtp(email);

      if (result.status === 200) {
        // TODO: Send otp to user via email
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
}

module.exports = AuthController;
